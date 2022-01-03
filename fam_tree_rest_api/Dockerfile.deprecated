# syntax=docker/dockerfile:1.3
ARG PG_MIGRATIONS_DIR=/migrations
ARG API_PORT=5000

# builder stage
FROM rust:1.54.0 as builder

WORKDIR /family_tree

COPY . .

RUN --mount=type=cache,target=/usr/local/cargo/registry \
    --mount=type=cache,sharing=private,target=/family_tree/target \
    cargo build --release && \
    cp target/release/migrator ./migrator/ && \
    cp target/release/api ./api/

# migrator binary
FROM debian:buster-slim as migrator

RUN apt-get update \
    && apt-get install -y openssl ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ARG PG_MIGRATIONS_DIR
RUN adduser --disabled-password migrator

COPY ./migrations ${PG_MIGRATIONS_DIR}
COPY --from=builder /family_tree/migrator/migrator /opt/

USER migrator
ENV PATH="/opt:$PATH"

ENTRYPOINT migrator


# api binary
FROM debian:buster-slim as tree_api

RUN apt-get update \
    && apt-get install -y openssl ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# RUN adduser --disabled-password api_runner

COPY --from=builder /family_tree/api/api /opt/tree_api

# USER api_runner
ENV PATH="/opt:$PATH"

EXPOSE ${API_PORT}
ENTRYPOINT tree_api
