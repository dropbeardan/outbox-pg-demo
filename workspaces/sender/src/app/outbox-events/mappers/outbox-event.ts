import { OutboxEventEntity } from "@/app/outbox-events/domain/outbox-event.entity";

export const mapToAPIResponse = (event: OutboxEventEntity) => ({
  createdAt: event.createdAt.toISOString(),
  id: event.id,
  payload: JSON.parse(event.payload),
  topic: event.topic,
  updatedAt: event.updatedAt,
});
