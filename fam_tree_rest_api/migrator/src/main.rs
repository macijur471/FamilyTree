use config::Config;
use sqlx::migrate::Migrator;
use sqlx::postgres::PgPoolOptions;
use std::env;
use std::path::Path;

#[tokio::main]
async fn main() {
    println!("-- Running Postgresql migrations --\n");

    let migrations_path =
        env::var("PG_MIGRATIONS_DIR").unwrap_or_else(|_| "./migrations".to_string());
    let m = Migrator::new(Path::new(&migrations_path)).await.unwrap();

    let config = Config::new();
    let pool = PgPoolOptions::new()
        .connect(&config.get_dal_url())
        .await
        .unwrap();

    match m.run(&pool).await {
        Ok(()) => println!("-- Migrations applied --"),
        Err(err) => {
            println!("Something went wrong");
            panic!("{:?}", err)
        }
    };
}
