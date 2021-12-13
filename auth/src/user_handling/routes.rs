use crate::Pool;
use super::handlers;
use super::auth::{AuthService};
use super::models::NewUser;
use actix_web::http::StatusCode;
use actix_web::{post, web, HttpResponse};

#[post("/login")]
async fn login(pool: web::Data<Pool>, user: web::Json<NewUser>) -> HttpResponse {
    let res = handlers::login(pool, user);
    match res {
        Ok(_) => HttpResponse::Ok().json(res.unwrap()),
        Err(_) => HttpResponse::Ok()
            .status(StatusCode::from_u16(401).unwrap())
            .json(res.unwrap_err()),
    }
}

#[post("/register")]
async fn register(pool: web::Data<Pool>, user: web::Json<NewUser>) -> HttpResponse {
    HttpResponse::Ok().json(handlers::add_user(pool, user))
}

#[post("/authenticate")]
async fn authenticate(_: AuthService) -> HttpResponse {
    HttpResponse::Ok().json(handlers::auth_function())
}

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(login);
    cfg.service(register);
    cfg.service(authenticate);
}