use actix_web::{post,get,delete, web,HttpResponse};
use super::models::ImgData;
use std::path::Path;
use s3::Bucket;
use image::ImageFormat;


#[post("/insert_image")]
async fn insert_image(bucket: web::Data<Bucket>, image_data: web::Json<ImgData>) -> HttpResponse {
    let key = (&image_data.individual_id).to_string();
    let uri = (&image_data.img_uri).to_string();
    let path = Path::new(&uri);
    println!("{:?}", path);
    if path.exists() {
        let img = std::fs::read(path).unwrap();
        bucket
            .put_object_with_content_type(key, &img, "image/png")
            .await;
        HttpResponse::Ok().finish()
    }
    else{
            HttpResponse::BadRequest().json("Wrong path")
    }
}

#[get("/{individual_id}")]
async fn get_image(bucket: web::Data<Bucket>, individual_id: web::Path<i32>) -> HttpResponse {
    let key = individual_id.into_inner().to_string();
    let data = bucket.get_object(key.clone()).await;
    let image = data.unwrap().0;
    match image::load_from_memory_with_format(&image, ImageFormat::Png) {
        Ok(_) => {
            let filename = "user".to_string() + &key;
            HttpResponse::Ok()
                .content_type("image/png")
                .header("accept-ranges", "bytes")
                .header("content-disposition", format!("attachment; filename=\"{}.png\"", filename))
                .body(image)
        }
        Err(_) => {
            HttpResponse::BadRequest().json("No image on server")
        }
    }
}

#[delete("/{individual_id}")]
async fn delete_image(mut bucket: web::Data<Bucket>, individual_id: web::Path<i32>) -> HttpResponse {
    let key = (&individual_id).to_string();
    let res = bucket
        .delete_object(key)
        .await;

    match res {
        Ok(_) => HttpResponse::Ok().json("Image deleted"),
        Err(_) => HttpResponse::BadRequest().finish(),
    }
}

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(insert_image);
    cfg.service(get_image);
    cfg.service(delete_image);

}





