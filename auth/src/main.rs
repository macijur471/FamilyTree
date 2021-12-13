#[macro_use]
extern crate diesel;

use lazy_static::lazy_static;


use actix_web::{middleware, web, App, HttpServer};
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};

mod user_handling;

pub type Pool = r2d2::Pool<ConnectionManager<PgConnection>>;

pub struct Values {
    pub pool: Pool,
    pub key: String,
}

lazy_static! {
   pub static ref VALUES: Values = {
        let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
        let manager = ConnectionManager::<PgConnection>::new(database_url);
        let key = std::env::var("SECRET_KEY").unwrap().to_string();
        Values {
           pool: Pool::builder()
               .build(manager)
               .expect("failed to create db connection_pool"),
            key
       }
   };
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    std::env::set_var("RUST_LOG", "actix_web=debug");
    let port = std::env::var("AUTH_PORT").unwrap_or_else(|_| "8080".to_string());
    let host = std::env::var("AUTH_HOST").unwrap_or_else(|_| "0.0.0.0".to_string());
    let url = format!("{}:{}", host, port);
    HttpServer::new(move|| {
        App::new()
            .data(VALUES.pool.clone())
            .wrap(middleware::Logger::default())
            .service(web::scope("/user").configure(user_handling::routes::init_routes))
    })
        .bind(url)?
        .run()
        .await
}