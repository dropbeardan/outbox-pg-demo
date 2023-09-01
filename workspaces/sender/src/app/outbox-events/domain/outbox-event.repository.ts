import { dataSource } from "@/typeorm/data-source";

import { OutboxEventEntity } from "@/app/outbox-events/domain/outbox-event.entity";

export const outboxEventRepository = dataSource.getRepository(OutboxEventEntity);
