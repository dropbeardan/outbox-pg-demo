import { EachMessagePayload, Message } from "kafkajs";

import { createNewMessage, deleteMessages } from "@/app/messages/domain";

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

const createMessageController = async (message: MessageSchema) => {
  await createNewMessage({
    createdAt: new Date(message.payload.payload.createdAt),
    id: message.payload.payload.id,
    message: message.payload.payload.message,
    updatedAt: new Date(message.payload.payload.updatedAt),
    user: message.payload.payload.user,
  });
};

export const deleteMessagesController = async () => {
  await deleteMessages();
};

const eventRouter = async (payload: EachMessagePayload) => {
  const rawMessageString = payload.message.value.toString();

  console.log("Received Message:", rawMessageString);

  const message: MessageSchema = JSON.parse(rawMessageString);

  console.log("Parsed message", message);

  if (message.payload.type === "message-created") {
    await createMessageController(message);
    return;
  }

  if (message.payload.type === "messages-deleted") {
    await deleteMessages();
    return;
  }
};

export default eventRouter;
