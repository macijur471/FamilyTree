use serde::{Deserialize, Serialize};
use sqlx::FromRow;

use super::Id;

#[derive(Deserialize, Serialize, FromRow, Clone, Debug)]
pub struct Families {
    pub id: Id,
    pub boss_of_the_family: Id,
    pub family_name: String,
}
