use crate::Pool;
use super::handlers;
use super::models::NewUser;
use actix_web::{post,get, web,HttpRequest, HttpResponse, Error};


#[post("/login")]
async fn login(pool: web::Data<Pool>, user: web::Json<NewUser>) -> HttpResponse {
    let res = handlers::login(pool, user);
    match res {
        Ok(_) => HttpResponse::Ok().json(res.unwrap()),
        Err(_) => HttpResponse::BadRequest().json(res.unwrap_err()),
    }
}

#[post("/register")]
async fn register(pool: web::Data<Pool>, user: web::Json<NewUser>) -> HttpResponse {
    let res = handlers::add_user(pool, user);
    match res {
        Ok(_) => HttpResponse::Ok().json(res.unwrap()),
        Err(_) => HttpResponse::BadRequest().json(res.unwrap_err()),
    }
}

#[get("/authenticate")]
async fn authenticate(_req: HttpRequest) -> HttpResponse {
    let _auth = _req.headers().get("Authorization");
    let _split: Vec<&str> = _auth.unwrap().to_str().unwrap().split("Bearer").collect();
    let token = _split[1].trim();
    match handlers::auth_function(token) {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(err) => HttpResponse::Unauthorized().json(err),
    }
}

#[get("/health")]
async fn health(pool: web::Data<Pool>) -> Result<HttpResponse, Error>{
    Ok(web::block(move || handlers::check_health(pool))
        .await
        .map(|_| HttpResponse::Ok().finish())
        .map_err(|_| HttpResponse::InternalServerError())?)
}


pub fn init_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(login);
    cfg.service(register);
    cfg.service(authenticate);
    cfg.service(health);
}
