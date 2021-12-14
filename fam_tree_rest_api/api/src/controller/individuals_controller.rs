use actix_web::{delete, get, post, put, web, Error, HttpResponse, Responder};
use serde::{Deserialize, Serialize};

use super::AppState;
use crate::errors::AppError;
use crate::models::Individual;

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

#[post("")]
async fn create_individual(
    app_state: web::Data<AppState<'_>>,
    individual: web::Json<Individual>,
) -> Result<impl Responder, AppError> {
    let individual = individual.into_inner();

    let query_res = app_state
        .context
        .individuals
        .create_individual(&individual)
        .await?;

    let ind_id = IndividualId { id: query_res };
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
