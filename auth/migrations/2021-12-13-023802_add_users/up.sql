CREATE TABLE users (
  id SERIAL NOT NULL PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT,
  surname TEXT
);-- Your SQL goes here