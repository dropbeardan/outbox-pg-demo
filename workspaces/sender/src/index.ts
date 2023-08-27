import "dotenv/config";
import process from "node:process";

import { createApp, startApp } from "@/app";
import { createKafkaInstance } from "@/kafka";
import { createPostgresConnection } from "@/typeorm";

const init = async () => {
  await createPostgresConnection();
  await createKafkaInstance();

  const app = createApp();

  startApp(app, Number(process.env.APP_PORT));
};

init();

process.on("SIGINT", () => {
  console.log("Process interrupted: SIGINT");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Process interrupted: SIGTERM");
  process.exit(0);
});
