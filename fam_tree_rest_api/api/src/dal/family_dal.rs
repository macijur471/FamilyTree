use super::{Family, Id, Table};
use log::debug;
use sqlx::postgres::PgQueryResult;
use sqlx::postgres::PgRow;
use sqlx::Row;

impl Table<'_, Family> {
    pub async fn create_family(&self, family: &Family) -> Result<i32, sqlx::Error> {
        sqlx::query(
            r#"
            INSERT INTO Families(author, rootId, family_name)
            VALUES ($1, $2, $3)
            RETURNING id"#,
        )
        .bind(&family.author_username)
        .bind(&family.root_id)
        .bind(&family.family_name)
        .fetch_one(&*self.pool)
        .await?
        .try_get(0)
    }

    pub async fn create_individual_family_rel(
        &self,
        relative_id: i32,
        ind_id: i32,
    ) -> Result<(), sqlx::Error> {
        let family_ids: Vec<i32> = sqlx::query(
            r#"
            SELECT itf.family_id
            FROM individualtofamilies itf
            WHERE itf.individual_id = $1"#,
        )
        .bind(relative_id)
        .map(|row: PgRow| row.get("family_id"))
        .fetch_all(&*self.pool)
        .await?;

        let rows_affected = sqlx::query(
            r#"
            INSERT INTO individualtofamilies(family_id, individual_id)
            VALUES(unnest($1), $2)"#,
        )
        .bind(family_ids)
        .bind(ind_id)
        .execute(&*self.pool)
        .await?;

        debug!("{:?}", rows_affected);
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
}
