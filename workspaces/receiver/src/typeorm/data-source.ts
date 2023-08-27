import path from "path";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [
    path.join(__dirname, "../app/**/*.entity.js"),
    path.join(__dirname, "../app/**/*.entity.ts"),
  ],
  migrations: [
    path.join(__dirname, "./migrations/**/*.js"),
    path.join(__dirname, "./migrations/**/*.ts"),
  ],
  migrationsTableName: "typeorm_migrations",
  subscribers: [],
});
