use actix_web::{middleware::Logger, web, App, HttpServer};
use std::sync::{Arc, Mutex};
// use api::dal::Database;
use api::{controller, dal::Database, AppState};
use config::Config;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let config = Config::new();

    let db_context = Database::new(&config.get_dal_url()).await;

    let app_state = web::Data::new(AppState {
        connections: Mutex::new(0),
        context: Arc::new(db_context),
    });
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("debug"));

    let app = HttpServer::new(move || {
        App::new()
            .wrap(Logger::default())
            .app_data(app_state.clone())
            .configure(controller::init_individuals_controller)
            .configure(controller::init_relationships_controller)
            .configure(controller::init_families_controller)
            .configure(controller::init_health_controller)
    })
    .bind(config.get_app_url())?;

    app.run().await
}
