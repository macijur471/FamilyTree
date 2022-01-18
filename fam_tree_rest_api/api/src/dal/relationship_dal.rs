use super::{FamTree, Id, Relationship, Table};
use sqlx::postgres::PgQueryResult;
use sqlx::Row;

#[derive(sqlx::FromRow)]
pub struct IndId(Id, String);

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
                relationship_type,
                individual_1_role,
                individual_2_role
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id"#,
        )
        .bind(&relationship.individual_1_id)
        .bind(&relationship.individual_2_id)
        .bind(&relationship.relationship_type)
        .bind(&relationship.individual_1_role)
        .bind(&relationship.individual_2_role)
        .fetch_one(&*self.pool)
        .await
        .unwrap()
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
        .await?;

        let ids: Vec<IndId> = sqlx::query_as(
            r#"
            SELECT if.individual_id, i.gender
            FROM individualtofamilies if LEFT JOIN individuals i
            ON i.id = if.individual_id
            WHERE if.family_id = $1"#,
        )
        .bind(family_id)
        .fetch_all(&*self.pool)
        .await?;

        let ids = ids.iter().map(|obj| (obj.0, obj.1.to_owned())).collect();

        Ok(FamTree::from_rels(&ids, &rels))
    }

    pub async fn edit_relationship(
        &self,
        relationship: &Relationship,
    ) -> Result<Relationship, sqlx::Error> {
        let x = sqlx::query_as(
            r#"
            INSERT INTO relationships
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (id)
            DO UPDATE
            SET individual_1_id = $2, individual_2_id = $3, relationship_type = $4, individual_1_role = $5, individual_2_role = $6
            RETURNING *
            "#,
        )
        .bind(&relationship.id)
        .bind(&relationship.individual_1_id)
        .bind(&relationship.individual_2_id)
        .bind(&relationship.relationship_type)
        .bind(&relationship.individual_1_role)
        .bind(&relationship.individual_2_role)
        .fetch_one(&*self.pool)
        .await;

        println!("{:?}", x);
        x
    }

    pub async fn delete_relation_for_individual_x(
        &self,
        ind_id: i32,
    ) -> Result<PgQueryResult, sqlx::Error> {
        sqlx::query(
            r#"
            DELETE FROM relationships where individual_1_id = $1 or individual_2_id = $1
            "#,
        )
        .bind(ind_id)
        .execute(&*self.pool)
        .await
    }
}
