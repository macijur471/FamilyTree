use crate::user_handling::models::Claims;
use actix_web::error::ErrorUnauthorized;
use actix_web::{dev, Error, FromRequest, HttpRequest};
use futures::future::{err, ok, Ready};
use jsonwebtoken::{decode, Algorithm, DecodingKey, Validation};

pub struct AuthService;

impl FromRequest for AuthService {
    type Error = Error;
    type Future = Ready<Result<AuthService, Error>>;
    type Config = ();

    fn from_request(_req: &HttpRequest, _payload: &mut dev::Payload) -> Self::Future {
        let _auth = _req.headers().get("Authorization");
        match _auth {
            Some(_) => {
                let _split: Vec<&str> = _auth.unwrap().to_str().unwrap().split("Bearer").collect();
                let token = _split[1].trim();
                let _var = std::env::var("SECRET_KEY").unwrap().to_string();
                let key = _var.as_bytes();
                match decode::<Claims>(
                    token,
                    &DecodingKey::from_secret(key),
                    &Validation::new(Algorithm::HS256),
                ) {
                    Ok(_token) => ok(AuthService),
                    Err(_e) => err(ErrorUnauthorized("Token expired/invalid")),
                }
            }
            None => err(ErrorUnauthorized("No token")),
        }
    }
}