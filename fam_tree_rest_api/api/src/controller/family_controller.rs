use actix_web::{delete, get, patch, post, web, HttpResponse, Responder};
use serde::Serialize;

use super::individuals_controller::IndividualId;
use super::AppState;

use crate::errors::AppError;
use crate::models::Family;

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/families")
            .service(create_family)
            .service(get_family),
    );
}

#[post("")]
async fn create_family(
    app_state: web::Data<AppState<'_>>,
    family: web::Json<Family>,
) -> Result<impl Responder, AppError> {
    let family = family.into_inner();

    let query_res = app_state.context.families.create_family(&family).await?;

    Ok(HttpResponse::Created().body(serde_json::json!({ "id": query_res }).to_string()))
}

#[get("/{family_id}")]
async fn get_family(
    family_id: web::Path<i32>,
    id: web::Query<IndividualId>,
    app_state: web::Data<AppState<'_>>,
) -> Result<HttpResponse, AppError> {
    println!("heelp");
    let id = id.into_inner();

    let family = app_state
        .context
        .families
        .get_family(id.id, family_id.into_inner())
        .await?;

    Ok(HttpResponse::Ok().json(family))
}
