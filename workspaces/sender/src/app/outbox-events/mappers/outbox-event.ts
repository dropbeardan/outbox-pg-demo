import { OutboxEventEntity } from "@/app/outbox-events/domain/outbox-event.entity";

export const mapToAPIResponse = (event: OutboxEventEntity) => ({
  aggregateId: event.aggregateId,
  aggregateType: event.aggregateType,
  createdAt: event.createdAt.toISOString(),
  id: event.id,
  payload: event.payload,
  updatedAt: event.updatedAt,
});
