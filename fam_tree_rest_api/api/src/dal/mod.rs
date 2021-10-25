use super::models::{FamTree, Family, Id, Individual, Relationship};

pub mod db_context;
mod family_dal;
mod individual_dal;
mod relationship_dal;

pub type Database<'a> = db_context::Database<'a>;
pub type Table<'a, T> = db_context::Table<'a, T>;
