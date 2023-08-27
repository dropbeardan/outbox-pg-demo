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

  return message;
};

export const deleteMessages = async () => {
  await messageRepository.delete({});
};

export const getMessages = async () => {
  const messages = await messageRepository.find({
    order: {
      createdAt: "DESC",
    },
  });

  return messages;
};
