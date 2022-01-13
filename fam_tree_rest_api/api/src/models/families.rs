use serde::{Deserialize, Serialize};
use sqlx::FromRow;

use super::Id;

#[derive(Deserialize, Serialize, FromRow, Clone, Debug)]
pub struct Families {
    pub id: Id,
    pub author_username: String,
    pub root_id: Id,
    pub family_name: String,
}
