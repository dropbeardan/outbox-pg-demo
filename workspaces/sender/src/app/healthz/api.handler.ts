import express, { Request, Response } from "express";

export const healthCheckController = (req: Request, res: Response) => {
  res.sendStatus(200);
};

const router = express.Router();

router.get("/", healthCheckController);

export default router;
