import express, { Request, Response } from "express";

import { deleteMessages, getMessages } from "@/app/messages/domain";
import { mapToAPIResponse } from "@/app/messages/mappers/message";

export const deleteMessagesController = async (req: Request, res: Response) => {
  try {
    await deleteMessages();

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const getMessagesController = async (req: Request, res: Response) => {
  try {
    const messages = await getMessages();

    res.status(200).json({
      messages: messages.map((message) => mapToAPIResponse(message)),
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const router = express.Router();

router.get("/", getMessagesController);
router.delete("/", deleteMessagesController);

export default router;
