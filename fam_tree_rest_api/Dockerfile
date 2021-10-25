ARG PG_MIGRATIONS_DIR=/migrations
ARG API_PORT=5000

# builder stage
FROM rust:1.54.0 as builder

WORKDIR /family_tree

COPY . .
RUN cargo build --release

# migrator binary
FROM debian:buster-slim as migrator

RUN apt-get update \
    && apt-get install -y openssl ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

USER root
ARG PG_MIGRATIONS_DIR

COPY ./migrations ${PG_MIGRATIONS_DIR}
COPY --from=builder /family_tree/target/release/migrator /opt/

ENV PATH="/opt:$PATH"

CMD ["migrator"]


# api binary
FROM debian:buster-slim as api

RUN apt-get update \
    && apt-get install -y openssl ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

USER root

COPY --from=builder /family_tree/target/release/api /opt/

ENV PATH="/opt:$PATH"

EXPOSE ${API_PORT}
CMD ["api"]
