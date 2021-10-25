use super::AppState;
use actix_web::{get, web, HttpResponse, Responder};

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(healthy);
}

#[get("/healthy")]
async fn healthy(app_state: web::Data<AppState<'_>>) -> impl Responder {
    let pg_response = app_state.context.health_check().await;

    match pg_response {
        true => HttpResponse::Ok().body("I am healthy"),
        false => HttpResponse::InternalServerError().body("Something went wrong"),
    }
}
