use super::AppState;
use actix_files::NamedFile;
use actix_web::{get, web, Responder};

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(openapi_definition);
}

#[get("/docs")]
async fn openapi_definition() -> impl Responder {
    NamedFile::open_async("/srv/api/openapi.yaml").await
}
