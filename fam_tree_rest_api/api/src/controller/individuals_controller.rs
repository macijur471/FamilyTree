use actix_web::{delete, get, post, put, web, Error, HttpResponse, Responder};
use serde::{Deserialize, Serialize};

use super::AppState;
use crate::errors::AppError;
use crate::models::relationships::{RelType, Role};
use crate::models::{Individual, Relationship};
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

#[post("")]
async fn create_individual(
    app_state: web::Data<AppState<'_>>,
    body: web::Json<PostIndividualBodyReq>,
) -> Result<impl Responder, AppError> {
    let body = body.into_inner();
    let individual = body.ind;

    let query_res = app_state
        .context
        .individuals
        .create_individual(&individual)
        .await?;

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

        let query_res = app_state
            .context
            .relationships
            .create_relationship(&relation)
            .await?;
        debug!("{:?}", query_res);

        app_state
            .context
            .families
            .create_individual_family_rel(relative_id, ind_id.id)
            .await?;
    }

    Ok(HttpResponse::Created().json(ind_id))
}

#[delete("/{id}")]
async fn delete_individual(
    id: web::Path<i32>,
    app_state: web::Data<AppState<'_>>,
) -> Result<impl Responder, AppError> {
    let query_res = app_state
        .context
        .individuals
        .delete_individual(id.into_inner())
        .await?;

    Ok(HttpResponse::NoContent())
}
