use chrono::NaiveDate;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

use super::{Id, Individual};

#[derive(Serialize, Deserialize, Clone, FromRow, Debug)]
pub struct Individuals {
    pub id: Id,
    pub names: String,
    pub gender: String,

    #[serde(with = "date_format")]
    pub date_of_birth: NaiveDate,

    #[serde(default)]
    #[serde(with = "optional_date_format")]
    pub date_of_death: Option<NaiveDate>,

    pub hometown: String,
    pub hobbies: Option<Vec<String>>,
    pub job: Option<String>,
}

#[derive(Serialize, Deserialize, Clone, FromRow)]
pub struct IndividualBaseInfo {
    pub id: String,
    pub names: String,

    #[serde(with = "date_format")]
    pub date_of_birth: NaiveDate,
}

impl From<Individuals> for IndividualBaseInfo {
    fn from(item: Individuals) -> Self {
        IndividualBaseInfo {
            id: item.id.unwrap().to_string(),
            names: item.names,
            date_of_birth: item.date_of_birth,
        }
    }
}

mod date_format {
    use chrono::NaiveDate;
    use serde::{self, Deserialize, Deserializer, Serializer};

    const FORMAT: &str = "%Y-%m-%d";

    pub fn serialize<S>(date: &NaiveDate, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let s = format!("{}", date.format(FORMAT));
        serializer.serialize_str(&s)
    }

    pub fn deserialize<'de, D>(deserializer: D) -> Result<NaiveDate, D::Error>
    where
        D: Deserializer<'de>,
    {
        let s = String::deserialize(deserializer)?;
        NaiveDate::parse_from_str(&s, FORMAT).map_err(serde::de::Error::custom)
    }
}

mod optional_date_format {
    use chrono::NaiveDate;
    use serde::{self, Deserialize, Deserializer, Serializer};

    const FORMAT: &str = "%Y-%m-%d";

    pub fn serialize<S>(date: &Option<NaiveDate>, s: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        if let Some(d) = date {
            return s.serialize_str(&d.format(FORMAT).to_string());
        }
        s.serialize_none()
    }

    pub fn deserialize<'de, D>(deserializer: D) -> Result<Option<NaiveDate>, D::Error>
    where
        D: Deserializer<'de>,
    {
        let s: Option<String> = Option::deserialize(deserializer)?;
        if let Some(s) = s {
            return Ok(Some(
                NaiveDate::parse_from_str(&s, FORMAT).map_err(serde::de::Error::custom)?,
            ));
        }

        Ok(None)
    }
}
