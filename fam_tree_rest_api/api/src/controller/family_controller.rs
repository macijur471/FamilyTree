use actix_web::{delete, get, patch, post, web, HttpResponse, Responder};
use log::debug;
use serde::{Deserialize, Serialize};

use super::individuals_controller::IndividualId;
use super::AppState;

use crate::errors::AppError;
use crate::models::Family;

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/families")
            .service(create_family)
            .service(get_family)
            .service(change_root),
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
    let id = id.into_inner();

    let family = app_state
        .context
        .families
        .get_family(id.id, family_id.into_inner())
        .await?;

    Ok(HttpResponse::Ok().json(family))
}

#[derive(Deserialize)]
struct NewRootId {
    old_id: String,
    new_id: String,
}

#[patch("/{family_id}")]
async fn change_root(
    family_id: web::Path<i32>,
    ids: web::Json<NewRootId>,
    app_state: web::Data<AppState<'_>>,
) -> Result<HttpResponse, AppError> {
    let ids = ids.into_inner();
    let family_id = family_id.into_inner();

    debug!("{}", family_id);
    let family = app_state
        .context
        .families
        .change_root_id(
            family_id,
            ids.new_id.parse::<i32>().unwrap(),
            ids.old_id.parse::<i32>().unwrap(),
        )
        .await?;

    Ok(HttpResponse::Ok().json(family))
}
