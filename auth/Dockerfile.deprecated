# syntax=docker/dockerfile:1.3
ARG PG_AUTH_USERNAME
ARG PG_AUTH_PASSWORD
ARG PG_HOST
ARG PG_AUTH_DB
# builder stage
FROM rust:1.56.0 as builder

WORKDIR /auth

COPY . .

RUN --mount=type=cache,target=/usr/local/cargo/registry \
    --mount=type=cache,sharing=private,target=/auth/target \
    cargo build --release && \
    cp target/release/auth ./auth && \
    cargo install diesel_cli --no-default-features --features postgres

# auth diesel binary
FROM debian:buster-slim as auth_migrator

ARG PG_AUTH_USERNAME
ARG PG_AUTH_PASSWORD
ARG PG_HOST
ARG PG_AUTH_DB

RUN apt-get update \
    && apt-get install -y libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY ./migrations /migrations
COPY --from=builder /usr/local/cargo/bin/diesel /usr/local/bin/diesel
ENV DATABASE_URL="postgres://${PG_AUTH_USERNAME}:${PG_AUTH_PASSWORD}@${PG_HOST}/${PG_AUTH_DB}"

RUN adduser --disabled-password auth_migrator
USER auth_migrator

ENTRYPOINT diesel migration run --migration-dir /migrations

# auth binary
FROM debian:buster-slim as auth_api

ARG PG_AUTH_USERNAME
ARG PG_AUTH_PASSWORD
ARG PG_HOST
ARG PG_AUTH_DB

RUN apt-get update \
    && apt-get install -y libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN adduser --disabled-password auth_runner

COPY ./migrations ./
COPY --from=builder /auth/auth /usr/local/bin/auth
ENV DATABASE_URL="postgres://${PG_AUTH_USERNAME}:${PG_AUTH_PASSWORD}@${PG_HOST}/${PG_AUTH_DB}"

USER auth_runner

EXPOSE ${AUTH_PORT}
ENTRYPOINT auth
