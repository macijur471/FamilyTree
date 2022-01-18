use std::error::Error;

use actix_web::{middleware, web, App, HttpServer};

mod models;
mod routes;

use s3::bucket::Bucket;
use s3::creds::Credentials;
use s3::region::Region;
use s3::BucketConfiguration;


#[tokio::main]
async fn main() ->Result<(), Box<dyn Error>>{
    std::env::set_var("RUST_LOG", "actix_web=debug");
    let nm = "fam-tree".to_string();
    let bucket = Bucket::new_with_path_style(
        &nm,
        Region::Custom {
            region: "".to_owned(),
            endpoint: std::env::var("MINIO_URL").unwrap_or_else(|_| "http://0.0.0.0:9000".to_string()).to_owned(),
        },
        Credentials {
            access_key: Some(std::env::var("MINIO_ACCESS_KEY").unwrap().to_string()),
            secret_key: Some(std::env::var("MINIO_SECRET_KEY").unwrap().to_string()),
            security_token: None,
            session_token: None,
        },
    )?;

    let (_, code) = bucket.head_object("/").await?;
    if code == 404 {
        Bucket::create_with_path_style(
            bucket.name.as_str(),
            bucket.region.clone(),
            bucket.credentials.clone(),
            BucketConfiguration::default(),
        )
            .await?;
    }

    let port = std::env::var("MINIO_API_PORT").unwrap_or_else(|_| "8000".to_string());
    let host = std::env::var("MINIO_API_HOST").unwrap_or_else(|_| "0.0.0.0".to_string());
    let url = format!("{}:{}", host, port);

    HttpServer::new(move|| {
        App::new()
            .wrap(middleware::Logger::default())
            .data(bucket.clone())
            .service(web::scope("").configure(routes::init_routes))
    })
        .bind(&url)?
        .run()
        .await;
    Ok(())
}