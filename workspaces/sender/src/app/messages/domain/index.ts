import { MessageEntity } from "@/app/messages/domain/message.entity";
import { messageRepository } from "@/app/messages/domain/message.repository";
import { OutboxEventEntity } from "@/app/outbox-events/domain/outbox-event.entity";

import { dataSource } from "@/typeorm/data-source";

export const createNewMessage = async (params: {
  createdAt?: Date;
  id?: string;
  message: string;
  updatedAt?: Date;
  user: string;
}) => {
  const createdMessage = await dataSource.transaction(async (txEntityManager) => {
    const message = MessageEntity.create(params);

    await txEntityManager.save(message);

    const outboxEvent = OutboxEventEntity.create({
      topic: "message-stream-topic",
      payload: {
        key: message.id,
        value: JSON.stringify({
          type: "message-created",
          payload: {
            createdAt: message.createdAt,
            id: message.id,
            message: message.message,
            updatedAt: message.updatedAt,
            user: message.user,
          },
        }),
      },
    });

    await txEntityManager.save(outboxEvent);

    return message;
  });

  return createdMessage;
};

export const deleteMessages = async () => {
  await dataSource.transaction(async (txEntityManager) => {
    await messageRepository.delete({});

    const outboxEvent = OutboxEventEntity.create({
      topic: "message-stream-topic",
      payload: {
        key: "messages-deleted",
        value: JSON.stringify({
          type: "messages-deleted",
        }),
      },
    });

    await txEntityManager.save(outboxEvent);
  });
};

export const getMessages = async () => {
  const messages = await messageRepository.find({
    order: {
      createdAt: "DESC",
    },
  });

  return messages;
};
