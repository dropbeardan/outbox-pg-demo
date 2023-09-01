import express, { Request, Response } from "express";

import { getOutboxEvents } from "@/app/outbox-events/domain";
import { mapToAPIResponse } from "@/app/outbox-events/mappers/outbox-event";

export const getOutboxEventsController = async (req: Request, res: Response) => {
  try {
    const events = await getOutboxEvents();

    res.status(200).json({
      events: events.map((event) => mapToAPIResponse(event)),
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const router = express.Router();

router.get("/", getOutboxEventsController);

export default router;
