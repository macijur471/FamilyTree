use std::env;

fn get_env(key: &str, default: &str) -> String {
    env::var(key).unwrap_or_else(|_| default.to_string())
}

struct AppConfig {
    host: String,
    port: String,
}
impl AppConfig {
    pub fn from_env() -> Self {
        let host = get_env("API_HOST", "0.0.0.0");
        let port = get_env("API_PORT", "5000");

        AppConfig { host, port }
    }
}

struct DalConfig {
    user: String,
    password: String,
    host: String,
    port: String,
    database: String,
}

impl DalConfig {
    pub fn from_env() -> Self {
        let user = get_env("PG_USER", "family_tree_user");
        let password = get_env("PG_PASSWORD", "changeme");
        let host = get_env("PG_HOST", "postgres");
        let port = get_env("PG_PORT", "5432");
        let database = get_env("PG_DATABASE", "family_tree");

        DalConfig {
            user,
            password,
            host,
            port,
            database,
        }
    }
}

pub struct Config {
    app: AppConfig,
    dal: DalConfig,
}

impl Default for Config {
    fn default() -> Self {
        Self::new()
    }
}

impl Config {
    pub fn new() -> Self {
        Config {
            app: AppConfig::from_env(),
            dal: DalConfig::from_env(),
        }
    }

    pub fn get_app_url(&self) -> String {
        format!("{}:{}", self.app.host, self.app.port)
    }

    pub fn get_dal_url(&self) -> String {
        format!(
            "postgres://{0}:{1}@{2}:{3}/{4}",
            self.dal.user, self.dal.password, self.dal.host, self.dal.port, self.dal.database
        )
    }
}
