use crate::Pool;
use super::handlers;
use super::models::NewUser;
use actix_web::http::StatusCode;
use actix_web::{post,get, web,HttpRequest, HttpResponse};

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

#[get("/authenticate")]
async fn authenticate(_req: HttpRequest) -> HttpResponse {
    let _auth = _req.headers().get("Authorization");
    let _split: Vec<&str> = _auth.unwrap().to_str().unwrap().split("Bearer").collect();
    let token = _split[1].trim();
    match handlers::auth_function(token) {
        Ok(result) => HttpResponse::Ok().json(result),
        Err(err) => HttpResponse::Ok().json(err),
    }
}

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(login);
    cfg.service(register);
    cfg.service(authenticate);
}