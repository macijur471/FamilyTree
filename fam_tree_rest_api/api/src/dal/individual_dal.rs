use std::convert::TryInto;

use super::Table;
use super::{Id, Individual, IndividualBaseInfo};
use log::debug;
use sqlx::postgres::PgQueryResult;
use sqlx::Row;

impl Table<'_, Individual> {
    pub async fn get_individuals_all(&self) -> Result<Vec<Individual>, sqlx::Error> {
        sqlx::query_as(
            r#"
            SELECT *
            FROM individuals"#,
        )
        .fetch_all(&*self.pool)
        .await
    }

    pub async fn get_base_info_ind_in_family(
        &self,
        family_id: i32,
    ) -> Result<Vec<IndividualBaseInfo>, sqlx::Error> {
        let inds: Vec<Individual> = sqlx::query_as(
            r#"
            SELECT i.*
            FROM individualtofamilies f
            LEFT JOIN individuals i ON f.individual_id=i.id
            WHERE f.family_id=$1"#,
        )
        .bind(family_id)
        .fetch_all(&*self.pool)
        .await?;
        debug!("Individuals: {:?}", inds);

        Ok(inds
            .into_iter()
            .map(|ind| IndividualBaseInfo::from(ind))
            .collect())
    }

    pub async fn create_individual(
        &self,
        individual: &Individual,
    ) -> Result<(i32, sqlx::Transaction<'_, sqlx::Postgres>), sqlx::Error> {
        let mut transaction = self.pool.begin().await?;
        let id = sqlx::query(
            r#"
            INSERT INTO individuals (names, gender, date_of_birth, date_of_death, hometown, hobbies, job)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id"#,
        )
        .bind(&individual.names)
        .bind(&individual.gender)
        .bind(&individual.date_of_birth)
        .bind(&individual.date_of_death)
        .bind(&individual.hometown)
        .bind(&individual.hobbies)
        .bind(&individual.job)
        .fetch_one(&mut transaction)
        .await;

        let id = id
            .map_err(|e| debug!("{:?}", e))
            .unwrap()
            .try_get(0)
            .unwrap();
        Ok((id, transaction))
    }

    pub async fn update_individual(
        &self,
        individual: &Individual,
    ) -> Result<Individual, sqlx::Error> {
        sqlx::query_as(
            r#"
            INSERT INTO Individuals (id, first_name, last_name, date_of_birth, gender)
            VALUES ($1, $2, $3, $4, gender)
            ON CONFLICT (id)
            DO UPDATE
            SET first_name = $2, last_name = $3, date_of_birth = $4, gender = $5
            RETURNING id, first_name, last_name, date_of_birth, gender
            "#,
        )
        .bind(&individual.id)
        .bind(&individual.date_of_birth)
        .bind(&individual.gender)
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
