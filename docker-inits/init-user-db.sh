#!/bin/sh
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER family_tree_user WITH PASSWORD '${TREE_POSTGRES_PASSWORD}';
    CREATE DATABASE family_tree;
    GRANT ALL PRIVILEGES ON DATABASE family_tree TO family_tree_user;
    CREATE USER auther WITH PASSWORD '${AUTH_POSTGRES_PASSWORD}';
    CREATE DATABASE auth;
    GRANT ALL PRIVILEGES ON DATABASE auth TO auther;
EOSQL
