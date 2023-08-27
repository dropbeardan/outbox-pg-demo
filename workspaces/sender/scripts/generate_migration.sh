#!/bin/bash

MIGRATION_DIR="./src/typeorm/migrations"

while [[ -z "$MIGRATION_NAME" ]]; do
  read -p "Enter name of the migration: " MIGRATION_NAME

  if [ -z $MIGRATION_NAME ]; then
    echo ""
    echo "Invalid - Migration name required."
  fi
done

yarn dotenv -e .env.migrations yarn typeorm-esm-config migration:generate $MIGRATION_DIR/$MIGRATION_NAME
