use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct ImgData {
    pub individual_id: String,
    pub img_uri: String,
}
