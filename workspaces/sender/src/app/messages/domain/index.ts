import { getKafkaProducer } from "@/kafka";

import { MessageEntity } from "@/app/messages/domain/message.entity";
import { messageRepository } from "@/app/messages/domain/message.repository";

export const createNewMessage = async (params: {
  createdAt?: Date;
  id?: string;
  message: string;
  updatedAt?: Date;
  user: string;
}) => {
  const message = MessageEntity.create(params);

  await messageRepository.save(message);

  const kafkaProducer = await getKafkaProducer();
  await kafkaProducer.send({
    topic: "message-stream-topic",
    messages: [
      {
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
    ],
  });

  return message;
};

export const deleteMessages = async () => {
  await messageRepository.delete({});

  const kafkaProducer = await getKafkaProducer();
  await kafkaProducer.send({
    topic: "message-stream-topic",
    messages: [
      {
        key: "messages-deleted",
        value: JSON.stringify({
          type: "messages-deleted",
        }),
      },
    ],
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
