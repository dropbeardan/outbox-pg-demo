import { processOutboxEvents } from "@/app/outbox-events/domain";

export const processOutboxEventsController = async () => {
  try {
    await processOutboxEvents();
  } catch (err) {
    console.error("Error while processing outbox events.");
  }
};
