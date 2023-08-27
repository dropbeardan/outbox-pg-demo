import { MessageEntity } from "@/app/messages/domain/message.entity";

export const mapToAPIResponse = (message: MessageEntity) => ({
  createdAt: message.createdAt.toISOString(),
  id: message.id,
  message: message.message,
  updatedAt: message.updatedAt,
  user: message.user,
});
