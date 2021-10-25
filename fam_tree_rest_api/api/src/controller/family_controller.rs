use actix_web::{delete, get, patch, post, web, HttpResponse, Responder};
use serde::Serialize;

use super::AppState;

use crate::errors::AppError;
use crate::models::Family;

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(create_family);
}

#[derive(Serialize)]
pub struct FamId {
    id: i32,
}

#[post("/family")]
async fn create_family(
    app_state: web::Data<AppState<'_>>,
    family: web::Json<Family>,
) -> Result<impl Responder, AppError> {
    let mut family = family.into_inner();

    let query_res = app_state
        .context
        .families
        .create_family(&family)
        .await
        .map_err(AppError::db_err)?;

    let fam_id = FamId { id: query_res };

    Ok(HttpResponse::Created().json(fam_id))
}
