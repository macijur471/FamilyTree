table! {
    users (id) {
        id -> Int4,
        username -> Text,
        password -> Text,
        first_name -> Nullable<Text>,
        surname -> Nullable<Text>,
    }
}
