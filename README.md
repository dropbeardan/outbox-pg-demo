# Outbox Pattern with PostgreSQL

# Setup Guide

## Installation

Since you need a live PostgresDB and Kafka ecosystem to make this work, it's recommended that you stick with running it all via Docker:

```
docker-compose up -d --build
```

This will create a fully functioning network of services.

> [!NOTE]
> If the app or kafka services crash immediately after booting, it is most likely because the services it depends on are not yet ready.
> Just wait until the other services are ready and start the failing containers manually again.

- Receiver App: localhost:25101
- Sender App: localhost:25201

# Contribution Guide

## Bootstrapping

Bootstrap the project after running the installation steps above.

```
yarn install
yarn bootstrap
```

## Development

Once you've bootstrapped the project, you can begin to work with hot-reloading enabled for the `src` directory.

If you are updating infra / ecosystem code, you might want to rebuild your containers to get it working again:

```
docker-compose up -d --build
```
