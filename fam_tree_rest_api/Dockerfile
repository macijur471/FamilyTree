ARG PG_MIGRATIONS_DIR=/migrations

FROM lukemathwalker/cargo-chef:latest-rust-1.53.0 AS chef
WORKDIR app

FROM chef AS planner
COPY . .
RUN cargo chef prepare --recipe-path recipe.json

FROM chef AS builder
COPY --from=planner /app/recipe.json recipe.json
# Build dependencies - this is the caching Docker layer!
RUN cargo chef cook --release --recipe-path recipe.json
# Build application
COPY . .
RUN cargo build --release

# We do not need the Rust toolchain to run the binary!
FROM debian:buster-slim AS migrator
RUN apt-get update \
    && apt-get install -y openssl ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ARG PG_MIGRATIONS_DIR

WORKDIR app
COPY ./migrations ${PG_MIGRATIONS_DIR}
COPY --from=builder /app/target/release/migrator /usr/local/bin
ENTRYPOINT ["/usr/local/bin/migrator"]

FROM debian:buster-slim AS tree_api
RUN apt-get update \
    && apt-get install -y openssl ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR app
COPY --from=builder /app/target/release/api /usr/local/bin
ENTRYPOINT ["/usr/local/bin/api"]
