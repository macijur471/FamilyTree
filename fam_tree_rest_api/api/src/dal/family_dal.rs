use super::{Family, Id, Table};
use sqlx::postgres::PgQueryResult;
use sqlx::Row;

impl Table<'_, Family> {
    pub async fn create_family(&self, family: &Family) -> Result<i32, sqlx::Error> {
        sqlx::query(
            r#"
            INSERT INTO Families(boss_of_the_family, family_name)
            VALUES ($1, $2)
            RETURNING id"#,
        )
        .bind(&family.boss_of_the_family)
        .bind(&family.family_name)
        .fetch_one(&*self.pool)
        .await?
        .try_get(0)
    }
}
