use serde::{Deserialize, Serialize};
use sqlx::FromRow;

use super::Id;

#[derive(sqlx::Type, Deserialize, Serialize, Debug, Clone)]
#[sqlx(type_name = "role", rename_all = "lowercase")]
pub enum Role {
    Parent,
    Child,
    Spouse,
    Sibling,
}

#[derive(sqlx::Type, Deserialize, Serialize, Debug, Clone, Copy)]
#[sqlx(type_name = "reltype", rename_all = "lowercase")]
pub enum RelType {
    Blood,
    Married,
    Divorced,
    Adopted,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct PreparedRelation {
    pub id: Id,

    #[serde(rename = "type")]
    pub rel_type: RelType,
}

#[derive(Deserialize, Serialize, FromRow, Clone, Debug)]
pub struct Relationships {
    pub id: Id,
    pub individual_1_id: Id,
    pub individual_2_id: Id,
    pub relationship_type: RelType,
    pub individual_1_role: Role,
    pub individual_2_role: Role,
}
