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

## Setting Up CDC Demo

### Creating Publication

Connect to the `sender-app` DB:

```
psql -U postgres -d sender-app
```

Run the following command:

```
CREATE PUBLICATION debezium_publications FOR TABLE outbox_events;
```

### Creating Connectors

```
POST localhost:8083/connectors

BODY:
{
  "name": "outbox-events-connector",
  "config": {
    "confluent.topic.replication.factor": 1,
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
    "database.dbname": "sender-app",
    "database.hostname": "host.docker.internal",
    "database.password": "password",
    "database.port": "25200",
    "database.user": "postgres",
    "plugin.name": "pgoutput",
    "publication.autocreate.mode": "disabled",
    "publication.name": "debezium_publications",
    "schema.registry.url": "http://localhost:8081",
    "slot.drop.on.stop": false,
    "slot.name": "debezium",
    "table.include.list": "public\\.outbox_events",
    "tasks.max": "1",
    "tombstones.on.delete": false,
    "topic.creation.default.replication.factor": 1,
    "topic.creation.default.partitions": 1,
    "transforms": "outbox",
    "transforms.outbox.table.expand.json.payload": true,
    "transforms.outbox.type": "io.debezium.transforms.outbox.EventRouter",
    "topic.prefix": "pg-connector",
    "value.converter": "org.apache.kafka.connect.json.JsonConverter"
  }
}
```
