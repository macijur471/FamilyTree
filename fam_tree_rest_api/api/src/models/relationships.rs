use serde::{Deserialize, Serialize};
use sqlx::FromRow;

use super::Id;

#[derive(sqlx::Type, Deserialize, Serialize, Debug, Clone, Copy)]
#[sqlx(type_name = "role", rename_all = "lowercase")]
#[serde(rename_all = "lowercase")]
pub enum Role {
    Parent,
    Child,
    Spouse,
    Sibling,
}

impl Role {
    pub fn reverse(role: &Role) -> Role {
        match role {
            Role::Parent => Role::Child,
            Role::Child => Role::Parent,
            _ => role.clone(),
        }
    }
}

#[derive(sqlx::Type, Deserialize, Serialize, Debug, Clone, Copy)]
#[sqlx(type_name = "reltype", rename_all = "lowercase")]
#[serde(rename_all = "lowercase")]
pub enum RelType {
    Blood,
    Married,
    Divorced,
    Adopted,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct PreparedRelation {
    pub id: String,

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

impl Relationships {
    pub fn new(
        id: Id,
        individual_1_id: Id,
        individual_2_id: Id,
        relationship_type: RelType,
        role_1_to_2: Role,
    ) -> Self {
        Relationships {
            id,
            individual_1_id,
            individual_2_id,
            relationship_type,
            individual_2_role: Role::reverse(&role_1_to_2),
            individual_1_role: role_1_to_2,
        }
    }
}
