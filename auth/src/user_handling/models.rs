use crate::user_handling::schema::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Queryable)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub password: String,
    pub first_name: Option<String>,
    pub surname:Option<String>,
}

#[derive(Serialize, Deserialize, Insertable, Debug)]
#[table_name = "users"]
pub struct NewUser {
    pub username: String,
    pub password: String
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub exp: usize,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct LoginResponse {
    pub status: bool,
    pub token: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Response {
    pub message: String,
    pub status: bool,
}