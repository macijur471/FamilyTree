use super::AppState;

pub mod default_route;
pub mod family_controller;
pub mod health_controller;
pub mod individuals_controller;
pub mod relationships_controller;

pub use family_controller::init as init_families_controller;
pub use health_controller::init as init_health_controller;
pub use individuals_controller::init as init_individuals_controller;
pub use relationships_controller::init as init_relationships_controller;
