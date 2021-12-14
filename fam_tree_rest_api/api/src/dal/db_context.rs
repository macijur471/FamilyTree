use sqlx::postgres::{PgPoolOptions, PgRow};
use sqlx::{FromRow, PgPool};
use std::sync::Arc;

use super::{Family, Individual, Relationship};

pub struct Table<'r, T>
where
    T: FromRow<'r, PgRow>,
{
    pub pool: Arc<PgPool>,
    _from_row: fn(&'r PgRow) -> Result<T, sqlx::Error>,
}

impl<'r, T> Table<'r, T>
where
    T: FromRow<'r, PgRow>,
{
    fn new(pool: Arc<PgPool>) -> Self {
        Table {
            pool,
            _from_row: T::from_row,
        }
    }
}

pub struct Database<'r> {
    pub individuals: Arc<Table<'r, Individual>>,
    pub relationships: Arc<Table<'r, Relationship>>,
    pub families: Arc<Table<'r, Family>>,
    uri: String,
}

impl<'r> Database<'r> {
    pub async fn new(uri: &str) -> Database<'_> {
        let pool = Arc::new(
            PgPoolOptions::new()
                .max_connections(8)
                .connect(uri)
                .await
                .unwrap(),
        );

        let individuals: Arc<Table<'_, Individual>> = Arc::from(Table::new(pool.clone()));
        let relationships: Arc<Table<'_, Relationship>> = Arc::from(Table::new(pool.clone()));
        let families: Arc<Table<'_, Family>> = Arc::from(Table::new(pool.clone()));

        Database {
            individuals,
            relationships,
            families,
            uri: uri.to_string(),
        }
    }

    pub async fn health_check(&self) -> bool {
        let pool = PgPoolOptions::new()
            .max_connections(8)
            .connect(&self.uri)
            .await
            .unwrap();

        sqlx::query(
            r#"
            SELECT 1"#,
        )
        .fetch_one(&pool)
        .await
        .is_ok()
    }
}
