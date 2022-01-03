use actix_web::{
    dev::{Service, ServiceRequest, ServiceResponse, Transform},
    Error, HttpResponse,
};
use futures::future::{ok, Either, Ready};
use std::task::{Context, Poll};

pub struct AuthMiddlewareFactory;

impl<S> Transform<S, ServiceRequest> for AuthMiddlewareFactory
where
    S: Service<ServiceRequest, Response = ServiceResponse, Error = Error>,
    S::Future: 'static,
{
    type Response = ServiceResponse;
    type Error = Error;
    type InitError = ();
    type Transform = AuthMiddleware<S>;
    type Future = Ready<Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        ok(AuthMiddleware { service })
    }
}

pub struct AuthMiddleware<S> {
    service: S,
}

impl<S> Service<ServiceRequest> for AuthMiddleware<S>
where
    S: Service<ServiceRequest, Response = ServiceResponse, Error = Error>,
    S::Future: 'static,
{
    type Response = ServiceResponse;
    type Error = Error;
    type Future = Either<S::Future, Ready<Result<Self::Response, Self::Error>>>;

    fn poll_ready(&self, cx: &mut Context<'_>) -> Poll<Result<(), Self::Error>> {
        self.service.poll_ready(cx)
    }

    fn call(&self, req: ServiceRequest) -> Self::Future {
        if req.path() == "/health" {
            return Either::Left(self.service.call(req));
        }

        let auth_header = req.headers().get("Authorization");
        match auth_header {
            Some(hdr) => {
                let client = reqwest::blocking::Client::new();
                let response = client
                    .get("http://haproxy/api/v1/auth/user/authenticate") // TODO change hardcoded url
                    .header(reqwest::header::AUTHORIZATION, hdr.to_str().unwrap())
                    .send();

                if let Ok(auth_res) = response {
                    match auth_res.status() {
                        reqwest::StatusCode::OK => Either::Left(self.service.call(req)),
                        reqwest::StatusCode::UNAUTHORIZED => {
                            Either::Right(ok(req.into_response(HttpResponse::Unauthorized())))
                        }
                        _ => Either::Right(ok(
                            req.into_response(HttpResponse::build(auth_res.status()))
                        )),
                    }
                } else {
                    Either::Right(ok(req.into_response(HttpResponse::Unauthorized())))
                }
            }
            None => Either::Right(ok(req.into_response(HttpResponse::Unauthorized()))),
        }
    }
}
