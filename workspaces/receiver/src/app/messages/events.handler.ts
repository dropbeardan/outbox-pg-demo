import { EachMessagePayload, Message } from "kafkajs";

import { createNewMessage, deleteMessages } from "@/app/messages/domain";

type MessageSchema = {
  type: string;
  payload: {
    createdAt: string;
    id: string;
    message: string;
    updatedAt: string;
    user: string;
  };
};

const createMessageController = async (message: MessageSchema) => {
  await createNewMessage({
    createdAt: new Date(message.payload.createdAt),
    id: message.payload.id,
    message: message.payload.message,
    updatedAt: new Date(message.payload.updatedAt),
    user: message.payload.user,
  });
};

export const deleteMessagesController = async () => {
  await deleteMessages();
};

const eventRouter = async (payload: EachMessagePayload) => {
  const rawMessageString = payload.message.value.toString();

  console.log("Received Message:", rawMessageString);

  const message: MessageSchema = JSON.parse(rawMessageString);

  if (message?.type === "message-created") {
    await createMessageController(message);
    return;
  }

  if (message?.type === "messages-deleted") {
    await deleteMessages();
    return;
  }
};

export default eventRouter;
