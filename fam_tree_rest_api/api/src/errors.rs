use std::any;

use actix_web::{error::ResponseError, http::StatusCode, HttpResponse};
use serde::Serialize;
use sqlx::Error as SqlError;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum AppError {
    #[error("Requested resource was not found")]
    NotFound,
    #[error("You are forbidden to access this resource")]
    Forbidden,
    #[error("Service is unavailable")]
    Unavailabe,
    #[error("Unknown Internal Error")]
    Unknown,
}

impl AppError {
    pub fn name(&self) -> String {
        match self {
            Self::NotFound => "NotFound".to_string(),
            Self::Forbidden => "Forbidden".to_string(),
            Self::Unavailabe => "Unavailable".to_string(),
            Self::Unknown => "Unknown".to_string(),
        }
    }

    pub fn message(code: u16, message: String) -> HttpResponse {
        let response = ErrorResponse {
            code,
            message,
            error: "true".to_string(),
        };

        HttpResponse::build(StatusCode::from_u16(code).unwrap()).json(response)
    }
}

impl ResponseError for AppError {
    fn status_code(&self) -> StatusCode {
        match *self {
            Self::NotFound => StatusCode::NOT_FOUND,
            Self::Forbidden => StatusCode::FORBIDDEN,
            Self::Unavailabe => StatusCode::SERVICE_UNAVAILABLE,
            Self::Unknown => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }

    fn error_response(&self) -> HttpResponse {
        let status_code = self.status_code();
        let error_response = ErrorResponse {
            code: status_code.as_u16(),
            message: self.to_string(),
            error: self.name(),
        };

        HttpResponse::build(status_code).json(error_response)
    }
}

impl From<SqlError> for AppError {
    fn from(error: SqlError) -> AppError {
        match error {
            SqlError::Configuration(_) | SqlError::PoolTimedOut | SqlError::WorkerCrashed => {
                AppError::Unavailabe
            }
            _ => AppError::NotFound,
        }
    }
}

impl From<anyhow::Error> for AppError {
    fn from(error: anyhow::Error) -> AppError {
        AppError::Unknown
    }
}

#[derive(Serialize)]
struct ErrorResponse {
    code: u16,
    error: String,
    message: String,
}
