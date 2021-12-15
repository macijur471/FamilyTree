use super::AppState;
use actix_web::{get, web, HttpResponse, Responder};

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(healthy);
}

#[get("/health")]
async fn healthy(app_state: web::Data<AppState<'_>>) -> impl Responder {
    let pg_response = app_state.context.health_check().await;
    let res_body = serde_json::json!({ "database_connected": pg_response }).to_string();

    let mut res = match pg_response {
        true => HttpResponse::Ok(),
        false => HttpResponse::ServiceUnavailable(),
    };

    res.body(res_body)
}
