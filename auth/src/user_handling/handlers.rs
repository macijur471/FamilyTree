use super::models::{LoginResponse, Response, Claims, NewUser, User};
use chrono::{Duration, Utc};
use jsonwebtoken::{Algorithm, decode, DecodingKey, encode, EncodingKey, Header, Validation};
use super::schema::users::dsl::*;
use crate::Pool;
use crate::diesel::{QueryDsl,RunQueryDsl,ExpressionMethods,OptionalExtension};
use actix_web::web;
use diesel::dsl::insert_into;
use crate::VALUES;
use crypto::digest::Digest;
use crypto::sha2::Sha256;


fn get_user_by_username(db: &web::Data<Pool>, name: String) -> Result<Option<User>, diesel::result::Error> {
    let conn = db.get().unwrap();
    let user = users.filter(username.eq((&name).to_string())).get_result::<User>(&conn).optional();
    return user;

}

pub fn add_user(db: web::Data<Pool>, user: web::Json<NewUser>) -> Result<LoginResponse, Response> {
    let is_taken = get_user_by_username(&db,(&user.username).to_string()).unwrap();
    match is_taken {
        Some(_) => {
            Err(Response {
                message: "Username already in use."
                    .to_string(),
                status: false,
            })
        }
        None => {
            let conn = db.get().unwrap();
            let mut hash = Sha256::new();
            hash.input_str(user.password.as_str());
            let new_user = NewUser {
                username: (&user.username).to_string(),
                password: hash.result_str(),
            };

            let res = insert_into(users).values(&new_user).get_result::<User>(&conn).optional();
            match res {
                Ok(_) => {
                    let key = VALUES.key.as_bytes();
                    let date = Utc::now() + Duration::hours(1);

                    let my_claims = Claims {
                        sub: (&new_user.username).to_string(),
                        exp: date.timestamp() as usize,
                    };
                    let token = encode(
                        &Header::default(),
                        &my_claims,
                        &EncodingKey::from_secret(key),
                    )
                        .unwrap();
                    Ok(LoginResponse {
                        status: true,
                        token,
                    })
                },
                Err(_) => Err(Response {
                    status: false,
                    message: "Database error.".to_string(),
                }),
            }
        }
    }
}

pub fn login(db: web::Data<Pool>, user: web::Json<NewUser>) -> Result<LoginResponse, Response> {
    let is_taken = get_user_by_username(&db,(&user.username).to_string()).unwrap();
    match is_taken {
        Some(x) => {
            let mut hash = Sha256::new();
            hash.input_str(user.password.as_str());
            if x.password == hash.result_str() {
                let key = VALUES.key.as_bytes();
                let date = Utc::now() + Duration::hours(1);

                let my_claims = Claims {
                    sub: (&user.username).to_string(),
                    exp: date.timestamp() as usize,
                };
                let token = encode(
                    &Header::default(),
                    &my_claims,
                    &EncodingKey::from_secret(key),
                )
                    .unwrap();
                Ok(LoginResponse {
                    status: true,
                    token,
                })
            } else {
                Err(Response {
                    status: false,
                    message: "Password or login incorrect.".to_string(),
                })
            }
        }
        None => Err(Response {
            status: false,
            message: "This username is not registered.".to_string(),
        }),
    }
}
pub fn auth_function(token: &str) -> Result<bool, Response> {
    let key = VALUES.key.as_bytes();
    let _decode = decode::<Claims>(
        token,
        &DecodingKey::from_secret(key),
        &Validation::new(Algorithm::HS256),
    );
    return match _decode {
        Ok(_) => {
            Ok(true)
        },
        Err(_) => Err(Response {
            status: false,
            message: "Invalid Token".to_string(),
        })
    }
}

pub fn check_health(db: web::Data<Pool>) -> Result<(), Response>{
    let conn = db.get().unwrap();
    let conn_check = users.load::<User>(&conn).is_ok();
    match conn_check{
        true => Ok(()),
        false => Err(Response {
            status: false,
            message: "No connection to database".to_string()
        })
    }
}