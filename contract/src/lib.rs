use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{ near_bindgen };

#[near_bindgen]
#[derive( BorshDeserialize, BorshSerialize)]
pub struct NewStruct {
    name: String,
}

impl Default for NewStruct {
    fn default() -> Self {
        Self {
            name: "some cool name".to_string()
        }
    }
}

#[near_bindgen]
impl NewStruct {
    pub fn view_function(self) -> String {
        self.name
    }

    pub fn chnage_function(&mut self, name: &str) {
        self.name = name.to_string();
    }
}