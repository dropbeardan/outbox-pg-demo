import { EachMessagePayload, Message } from "kafkajs";

import { deleteOutboxEvent } from "@/app/outbox-events/domain";

type MessageSchema = {
  schema: Record<string, unknown>;
  payload: {
    eventId: string;
    type: string;
    payload: {
      createdAt: string;
      id: string;
      message: string;
      updatedAt: string;
      user: string;
    };
  };
};

const eventRouter = async (payload: EachMessagePayload) => {
  const rawMessageString = payload.message.value.toString();

  console.log("Received Message:", rawMessageString);

  const message: MessageSchema = JSON.parse(rawMessageString);

  console.log("Parsed message", message);

  await deleteOutboxEvent(message.payload.eventId);
};

export default eventRouter;
