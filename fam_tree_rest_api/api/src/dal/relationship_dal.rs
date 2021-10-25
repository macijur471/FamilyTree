use super::{FamTree, Id, Relationship, Table};
use sqlx::postgres::PgQueryResult;
use sqlx::Row;

#[derive(sqlx::FromRow)]
pub struct IndId(Id);

impl Table<'_, Relationship> {
    pub async fn create_relationship(
        &self,
        relationship: &Relationship,
    ) -> Result<i32, sqlx::Error> {
        sqlx::query(
            r#"
            INSERT INTO relationships(
                individual_1_id,
                individual_2_id,
                relationshipship_type,
                individual_1_role,
                individual_2_role
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id"#,
        )
        .bind(&relationship.individual_1_id)
        .bind(&relationship.individual_2_id)
        .bind(&relationship.relationship_type)
        .bind(&relationship.individual_1_role)
        .bind(&relationship.individual_2_role)
        .fetch_one(&*self.pool)
        .await?
        .try_get(0)
    }

    pub async fn get_relationships_all(&self) -> Result<Vec<Relationship>, sqlx::Error> {
        sqlx::query_as(
            r#"
            SELECT * FROM relationships;"#,
        )
        .fetch_all(&*self.pool)
        .await
    }

    pub async fn get_family_as_relationships(
        &self,
        family_id: i32,
    ) -> Result<Vec<FamTree>, sqlx::Error> {
        let rels = sqlx::query_as::<_, Relationship>(
            r#"
                SELECT * FROM relationships;"#,
        )
        .fetch_all(&*self.pool)
        .await
        .unwrap();

        let ids: Vec<IndId> = sqlx::query_as(
            r#"
            SELECT individual_id FROM individualtofamilies WHERE family_id = $1"#,
        )
        .bind(family_id)
        .fetch_all(&*self.pool)
        .await
        .unwrap();

        let ids = ids.iter().map(|obj| obj.0).collect();

        Ok(FamTree::from_rels(&ids, &rels))
    }
}
