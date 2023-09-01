import { groupBy, prop } from "ramda";

import { OutboxEventEntity } from "@/app/outbox-events/domain/outbox-event.entity";
import { outboxEventRepository } from "@/app/outbox-events/domain/outbox-event.repository";

import { getKafkaProducer } from "@/kafka";

import { dataSource } from "@/typeorm/data-source";

export const processOutboxEvents = async () => {
  console.log("Processing next OutboxEvents batch in queue.");

  try {
    await dataSource.transaction(async (txEntityManager) => {
      const events = await txEntityManager.find(OutboxEventEntity, {
        order: {
          createdAt: "ASC",
        },
        take: 50,
      });

      const kafkaProducer = await getKafkaProducer();

      const eventsGroupedByTopics = groupBy(prop("topic"), events);

      Object.entries(eventsGroupedByTopics).forEach(async ([topic, events]) => {
        const eventIds = events.map((event) => event.id);

        console.log(
          `Dispatching ${events.length} events for ${topic} topic: ${eventIds.join(", ")}`,
        );

        await kafkaProducer.send({
          topic,
          messages: events.map((event) => JSON.parse(event.payload)),
        });

        console.log(`Successfully dispatched events: ${eventIds.join(", ")}`);
      });

      await txEntityManager.remove(events);
    });

    console.log("Successfully processed OutboxEvents batch in queue.");
  } catch (err) {
    console.log("Failed to process OutboxEvents batch in queue.");
  }
};

export const getOutboxEvents = async () => {
  const messages = await outboxEventRepository.find({
    order: {
      createdAt: "ASC",
    },
  });

  return messages;
};
