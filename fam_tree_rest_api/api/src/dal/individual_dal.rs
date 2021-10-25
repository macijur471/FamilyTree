use super::Table;
use super::{Id, Individual};
use sqlx::postgres::PgQueryResult;
use sqlx::Row;

impl Table<'_, Individual> {
    pub async fn get_individuals_all(&self) -> Result<Vec<Individual>, sqlx::Error> {
        sqlx::query_as(
            r#"
            SELECT id, first_name, last_name, date_of_birth
            FROM individuals"#,
        )
        .fetch_all(&*self.pool)
        .await
    }

    pub async fn create_individual(&self, individual: &Individual) -> Result<i32, sqlx::Error> {
        sqlx::query(
            r#"
            INSERT INTO Individuals (first_name, last_name, date_of_birth)
            VALUES ($1, $2, $3)
            RETURNING id"#,
        )
        .bind(&individual.first_name)
        .bind(&individual.last_name)
        .bind(&individual.date_of_birth)
        .fetch_one(&*self.pool)
        .await?
        .try_get(0)
    }
}
