use actix_web::{delete, get, post, put, web, HttpResponse, Responder};
use serde::Serialize;

use super::AppState;

use crate::errors::AppError;
use crate::models::{Individual, Relationship};

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(create_relationship)
        .service(get_family_tree)
        .service(edit_relationship);
}

#[derive(Serialize)]
struct RelId {
    id: i32,
}

#[post("/relationships")]
async fn create_relationship(
    app_state: web::Data<AppState<'_>>,
    relationship: web::Json<Relationship>,
) -> Result<impl Responder, AppError> {
    let relationship = relationship.into_inner();

    let query_res = app_state
        .context
        .relationships
        .create_relationship(&relationship)
        .await?;

    let rel_id = RelId { id: query_res };
    Ok(HttpResponse::Created().json(rel_id))
}

#[get("/tree/{family_id}")]
async fn get_family_tree(
    family_id: web::Path<i32>,
    app_state: web::Data<AppState<'_>>,
) -> Result<HttpResponse, AppError> {
    let fam_tree = app_state
        .context
        .relationships
        .get_family_as_relationships(family_id.into_inner())
        .await?;

    Ok(HttpResponse::Ok().json(fam_tree))
}

#[put("/relationships")]
async fn edit_relationship(
    app_state: web::Data<AppState<'_>>,
    relationship: web::Json<Relationship>,
) -> Result<HttpResponse, AppError> {
    let relationship = relationship.into_inner();

    let query_res = app_state
        .context
        .relationships
        .edit_relationship(&relationship)
        .await?;

    Ok(HttpResponse::Created().json(query_res))
}
