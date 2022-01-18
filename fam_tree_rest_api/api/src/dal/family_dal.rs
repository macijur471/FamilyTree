use super::{Family, Id, Table};
use anyhow::Result;
use futures::TryFutureExt;
use log::debug;
use sqlx::postgres::PgQueryResult;
use sqlx::postgres::PgRow;
use sqlx::Row;
use thiserror::Error;

#[derive(Debug, Error)]
enum ChangingFamRootErrs {
    #[error("root individual of the tree cannot be changed to the individual that is already assigned to other tree")]
    IndInOtherFam,
}

impl Table<'_, Family> {
    pub async fn create_family(&self, family: &Family) -> Result<i32, sqlx::Error> {
        let id = sqlx::query(
            r#"
            INSERT INTO families(author_username, root_id)
            VALUES ($1, $2)
            RETURNING id"#,
        )
        .bind(&family.author_username)
        .bind(&family.root_id)
        .map(|row: PgRow| -> i32 { row.get("id") })
        .fetch_one(&*self.pool)
        .await;

        debug!("{:?}", id);
        id
    }

    pub async fn create_individual_family_rel(
        &self,
        family_id: Option<i32>,
        relative_id: Option<i32>,
        ind_id: i32,
    ) -> Result<()> {
        let insert_str = r#"
                INSERT INTO individualtofamilies(family_id, individual_id)
                VALUES(unnest($1), $2)"#;

        let family_ids_query = sqlx::query(
            r#"
                SELECT itf.family_id
                FROM individualtofamilies itf
                WHERE itf.individual_id = $1"#,
        );
        if relative_id.is_some() && family_id.is_none() {
            let family_ids: Vec<i32> = family_ids_query
                .bind(relative_id)
                .map(|row: PgRow| row.get("family_id"))
                .fetch_all(&*self.pool)
                .await?;

            let rows_affected = sqlx::query(insert_str)
                .bind(family_ids)
                .bind(ind_id)
                .execute(&*self.pool)
                .await?;

            debug!("{:?}", rows_affected);
        } else if family_id.is_some() && relative_id.is_none() {
            let family_ids: Vec<i32> = family_ids_query
                .bind(ind_id)
                .map(|row: PgRow| row.get("family_id"))
                .fetch_all(&*self.pool)
                .await?;

            if let Some(family_id_val) = family_id {
                if family_ids.contains(&family_id_val) {
                    return Err(anyhow::Error::new(ChangingFamRootErrs::IndInOtherFam));
                }
            }

            let rows_affected = sqlx::query(insert_str)
                .bind(vec![family_id])
                .bind(ind_id)
                .execute(&*self.pool)
                .await?;

            debug!("{:?}", rows_affected);
        }

        Ok(())
    }

    pub async fn get_family_id_by_author(&self, author: String) -> Result<(i32, i32), sqlx::Error> {
        let x = sqlx::query_as::<_, (i32, i32)>(
            r#"
            select id, root_id from families where author_username = $1
            "#,
        )
        .bind(author)
        .fetch_one(&*self.pool)
        .await?;

        println!("{:?}", x);
        Ok(x)
    }

    pub async fn get_family(&self, ind_id: i32, family_id: i32) -> Result<Family, sqlx::Error> {
        let x = sqlx::query_as(
            r#"
            SELECT * FROM individualtofamilies itf
            LEFT JOIN families f ON itf.family_id=f.id
            WHERE itf.individual_id=$1
            AND f.id=$2"#,
        )
        .bind(ind_id)
        .bind(family_id)
        .fetch_one(&*self.pool)
        .await;
        println!("{:?}", x);
        x
    }

    pub async fn change_root_id(
        &self,
        family_id: i32,
        new_id: i32,
        old_id: i32,
    ) -> Result<Family, sqlx::Error> {
        let family = sqlx::query_as(
            r#"
            UPDATE families set root_id = $1 where root_id = $2 and id = $3
            RETURNING *
            "#,
        )
        .bind(new_id)
        .bind(old_id)
        .bind(family_id)
        .fetch_one(&*self.pool)
        .await;

        debug!("{:?}", family);
        family
    }

    pub async fn is_root_of_family(&self, ind_id: i32) -> Result<bool, sqlx::Error> {
        let result: i64 = sqlx::query(
            r#"
            SELECT count(*) as count FROM families
            WHERE root_id = $1;
            "#,
        )
        .bind(ind_id)
        .map(|row: PgRow| row.get("count"))
        .fetch_one(&*self.pool)
        .await
        .unwrap();

        debug!("{:?}", result);
        Ok(result > 0)
    }

    pub async fn delete_family_to_ind_rels(
        &self,
        ind_id: i32,
    ) -> Result<PgQueryResult, sqlx::Error> {
        sqlx::query(
            r#"
                DELETE FROM individualtofamilies where individual_id = $1;
                "#,
        )
        .bind(ind_id)
        .execute(&*self.pool)
        .await
    }
}
