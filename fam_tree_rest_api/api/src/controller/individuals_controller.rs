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

    pub relative: Option<String>,
    pub relation: Option<RelType>,
    pub role: Option<Role>,
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
    //.create_individual(&individual)
    //.await?;
    let (query_res, transaction) = res;
    let ind_id = IndividualId { id: query_res };

    if body.relative.is_some() && body.relation.is_some() && body.role.is_some() {
        let relative_id = body.relative.unwrap().parse().unwrap();

        let relation = Relationship::new(
            None,
            Some(ind_id.id),
            Some(relative_id),
            body.relation.unwrap(),
            body.role.unwrap(),
        );

        transaction.commit().await;
        let query_res = app_state
            .context
            .relationships
            .create_relationship(&relation)
            .await?;
        debug!("{:?}", query_res);

        app_state
            .context
            .families
            .create_individual_family_rel(None, Some(relative_id), ind_id.id)
            .await?;
    } else {
        let family = Family {
            id: None,
            author_username: username.into_inner(),
            root_id: ind_id.id,
        };
        let family_id = match app_state.context.families.create_family(&family).await {
            Ok(id) => {
                transaction.commit().await;
                id
            }
            Err(e) => {
                debug!("{}", e);
                transaction.rollback().await;
                return Err(AppError::from(e));
            }
        };

        app_state
            .context
            .families
            .create_individual_family_rel(Some(family_id), None, ind_id.id)
            .await?;
    }

    Ok(HttpResponse::Created().json(ind_id))
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
