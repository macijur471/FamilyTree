use actix_web::{delete, get, patch, post, web, Error, HttpResponse, Responder};
use serde::Serialize;

use super::AppState;
use crate::errors::AppError;
use crate::models::Individual;

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/individuals")
            .service(get_individuals)
            .service(create_individual),
    );
}

#[derive(Serialize)]
struct IndividualId {
    id: i32,
}

#[get("")]
async fn get_individuals(app_state: web::Data<AppState<'_>>) -> Result<impl Responder, AppError> {
    let individuals = app_state
        .context
        .individuals
        .get_individuals_all()
        .await
        .map_err(AppError::db_err)?;

    Ok(HttpResponse::Ok().json(individuals))
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
        .await
        .map_err(AppError::db_err)?;

    let ind_id = IndividualId { id: query_res };
    Ok(HttpResponse::Created().json(ind_id))
}
