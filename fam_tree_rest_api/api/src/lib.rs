use std::sync::{Arc, Mutex};

use crate::dal::Database;

pub mod controller;
pub mod dal;
pub mod errors;
pub mod models;

pub struct AppState<'a> {
    pub connections: Mutex<u32>,
    pub context: Arc<Database<'a>>,
}
