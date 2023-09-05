import cors from "cors";
import express, { Express } from "express";

import healthzRoutes from "@/app/healthz/api.handler";
import messagesRoutes from "@/app/messages/api.handler";
import outboxEventsRoutes from "@/app/outbox-events/api.handler";
import outboxEventsEventRoutes from "@/app/outbox-events/events.handler";

import { getKafkaConsumer } from "@/kafka";

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/healthz", healthzRoutes);
  app.use("/messages", messagesRoutes);
  app.use("/outbox-events", outboxEventsRoutes);

  return app;
};

export const startApp = (app: Express, port: number) => {
  app.listen(port, () => {
    console.log(`App listening to port ${port}`);
  });
};

export const subscribeToKafkaEvents = async () => {
  const consumer = await getKafkaConsumer("sender");

  await consumer.subscribe({
    topics: ["outbox.event.message-events"],
  });

  consumer.run({
    eachMessage: outboxEventsEventRoutes,
  });
};
