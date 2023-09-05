import { outboxEventRepository } from "@/app/outbox-events/domain/outbox-event.repository";

export const getOutboxEvents = async () => {
  const messages = await outboxEventRepository.find({
    order: {
      createdAt: "ASC",
    },
  });

  return messages;
};
