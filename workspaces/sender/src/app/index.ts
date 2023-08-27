import cors from "cors";
import express, { Express } from "express";

import healthzRoutes from "@/app/healthz/api.handler";
import messagesRoutes from "@/app/messages/api.handler";

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/healthz", healthzRoutes);
  app.use("/messages", messagesRoutes);

  return app;
};

export const startApp = (app: Express, port: number) => {
  app.listen(port, () => {
    console.log(`App listening to port ${port}`);
  });
};
