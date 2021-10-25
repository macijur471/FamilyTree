mod fam_tree;
mod families;
mod individuals;
pub mod relationships;

pub type Individual = individuals::Individuals;
pub type Relationship = relationships::Relationships;
pub type Family = families::Families;
pub type FamTree = fam_tree::FamTree;
pub type PgId = i32;
pub type Id = Option<PgId>;
