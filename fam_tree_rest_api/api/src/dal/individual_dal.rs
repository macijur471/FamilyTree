use std::convert::TryInto;

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

    pub async fn update_individual(
        &self,
        individual: &Individual,
    ) -> Result<Individual, sqlx::Error> {
        sqlx::query_as(
            r#"
            INSERT INTO Individuals (id, first_name, last_name, date_of_birth)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (id)
            DO UPDATE
            SET first_name = $2, last_name = $3, date_of_birth = $4
            RETURNING id, first_name, last_name, date_of_birth
            "#,
        )
        .bind(&individual.id)
        .bind(&individual.first_name)
        .bind(&individual.last_name)
        .bind(&individual.date_of_birth)
        .fetch_one(&*self.pool)
        .await
    }

    pub async fn delete_individual(&self, id: i32) -> Result<PgQueryResult, sqlx::Error> {
        let x = sqlx::query(
            r#"
            DELETE FROM Individuals
            WHERE id = $1
            "#,
        )
        .bind(id)
        .execute(&*self.pool)
        .await;

        println!("{:?}", x);
        x
    }
}
