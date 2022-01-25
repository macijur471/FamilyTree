use actix_web::{delete, get, post, put, web, Error, HttpResponse, Responder};
use serde::{Deserialize, Serialize};

use super::AppState;
use crate::errors::AppError;
use crate::models::relationships::{RelType, Role};
use crate::models::{Family, Individual, Relationship};
use log::debug;

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/individuals")
            .service(get_individuals)
            .service(get_individual_by_id)
            .service(create_individual)
            .service(edit_individual)
            .service(delete_individual),
    );
}

#[derive(Serialize, Deserialize)]
pub struct IndividualId {
    pub id: i32,
}

#[get("")]
async fn get_individuals(app_state: web::Data<AppState<'_>>) -> Result<HttpResponse, AppError> {
    let individuals = app_state.context.individuals.get_individuals_all().await?;

    Ok(HttpResponse::Ok().json(individuals))
}

#[get("/{id}")]
async fn get_individual_by_id(
    id: web::Path<i32>,
    app_state: web::Data<AppState<'_>>,
) -> Result<HttpResponse, AppError> {
    let id = id.into_inner();
    let individual = app_state.context.individuals.get_individual_by_id(id).await;

    match individual {
        Ok(ind) => Ok(HttpResponse::Ok().json(ind)),
        Err(e) => match e {
            sqlx::Error::RowNotFound => {
                let err_str = format!("individual with id: {} does not exists in our database", id);
                Ok(HttpResponse::NotFound().json(serde_json::json!({
                    "success": false,
                    "error": err_str
                })))
            }
            _ => Err(AppError::from(e)),
        },
    }
}

#[put("")]
async fn edit_individual(
    app_state: web::Data<AppState<'_>>,
    individual: web::Json<Individual>,
) -> Result<HttpResponse, AppError> {
    let individual = individual.into_inner();

    let query_res = app_state
        .context
        .individuals
        .update_individual(&individual)
        .await?;

    Ok(HttpResponse::Ok().json(query_res))
}

#[derive(Serialize, Deserialize, Debug, Clone)]
struct PostIndividualBodyReq {
    #[serde(flatten)]
    pub ind: Individual,
    pub relatives: Vec<Relatives>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
struct Relatives {
    pub relative: String,
    pub relation: RelType,
    pub role: Role,
}

struct RelativesWrapper<'a> {
    ind_id: i32,
    rels: &'a Vec<Relatives>,
    index: usize,
}

impl<'a> Iterator for RelativesWrapper<'a> {
    type Item = &'a Relatives;

    fn next(&mut self) -> Option<Self::Item> {
        if self.index >= self.rels.len() {
            return None;
        }

        self.index += 1;
        Some(&self.rels[self.index - 1])
    }
}

impl<'a> From<RelativesWrapper<'a>> for Vec<Relationship> {
    fn from(rels: RelativesWrapper) -> Vec<Relationship> {
        let id = rels.ind_id;
        rels.map(|rel| {
            Relationship::new(
                None,
                Some(id),
                Some(rel.relative.parse().unwrap()),
                rel.relation,
                Role::reverse(&rel.role),
            )
        })
        .collect()
    }
}

#[post("/{username}")]
async fn create_individual(
    app_state: web::Data<AppState<'_>>,
    username: web::Path<String>,
    body: web::Json<PostIndividualBodyReq>,
) -> Result<impl Responder, AppError> {
    let body = body.into_inner();
    let individual = body.ind;

    let res = app_state
        .context
        .individuals
        .create_individual(&individual)
        .await?;

    let (query_res, transaction) = res;
    let ind_id = IndividualId { id: query_res };

    match body.relatives.is_empty() {
        false => {
            let relatives = RelativesWrapper {
                ind_id: ind_id.id,
                rels: &body.relatives,
                index: 0,
            };

            let relation_converter = move |rel| Vec::<Relationship>::from(rel);
            let relations = relation_converter(relatives);

            transaction.commit().await?;
            let query_results = app_state
                .context
                .relationships
                .create_relationship_many(&relations)
                .await;

            let mut returned_errors = Vec::with_capacity(query_results.len());
            for i in 0..query_results.len() {
                if let Err(e) = &query_results[i] {
                    debug!("{}", e);
                    returned_errors.push(format!(
                        "creating relation between {} and {} failed",
                        ind_id.id,
                        relations[i].individual_2_id.unwrap()
                    ));
                }
            }

            debug!("{:?}", query_res);

            app_state
                .context
                .families
                .create_individual_family_rel(
                    None,
                    Some(relations[0].individual_2_id.unwrap()),
                    ind_id.id,
                )
                .await?;

            let response_body = serde_json::json!({
                "success": true,
                "failed_to_create_relation": returned_errors,
                "new_ind_id": ind_id.id.to_string()
            });

            Ok(HttpResponse::Created().json(response_body))
        }
        true => {
            let family = Family {
                id: None,
                author_username: username.into_inner(),
                root_id: ind_id.id,
            };
            let family_id = match app_state.context.families.create_family(&family).await {
                Ok(id) => {
                    transaction.commit().await?;
                    id
                }
                Err(e) => {
                    debug!("{}", e);
                    transaction.rollback().await?;
                    return Err(AppError::from(e));
                }
            };

            app_state
                .context
                .families
                .create_individual_family_rel(Some(family_id), None, ind_id.id)
                .await?;

            let response_body = serde_json::json!({
                "success": true,
                "new_family_id": family_id.to_string(),
                "new_ind_id": ind_id.id.to_string()
            });
            Ok(HttpResponse::Created().json(response_body))
        }
    }
}

#[delete("/{id}")]
async fn delete_individual(
    id: web::Path<i32>,
    app_state: web::Data<AppState<'_>>,
) -> Result<impl Responder, AppError> {
    let ind_id = id.into_inner();

    if app_state.context.families.is_root_of_family(ind_id).await? == true {
        let response_body = serde_json::json!({
            "success": false,
            "error": "root of the tree can not be deleted"
        });
        return Ok(HttpResponse::NotAcceptable().json(response_body));
    }

    app_state
        .context
        .relationships
        .delete_relation_for_individual_x(ind_id)
        .await?;

    app_state
        .context
        .families
        .delete_family_to_ind_rels(ind_id)
        .await?;

    app_state
        .context
        .individuals
        .delete_individual(ind_id)
        .await?;

    let response_body = serde_json::json!({
        "success": true
    });
    Ok(HttpResponse::Ok().json(response_body))
}
