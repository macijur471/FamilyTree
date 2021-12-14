use crate::errors::AppError;
use actix_web::{get, web, HttpResponse};

pub fn not_found() -> HttpResponse {
    HttpResponse::NotFound().body(serde_json::json!({"code": "404", "error": "NotFound", "message": "Requested resource was not found"}).to_string())
}
