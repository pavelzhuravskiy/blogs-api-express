import { Request, Response, Router } from "express";

export const testingRouter = Router({});

testingRouter.delete("/all-data", (req: Request, res: Response) => {
  res.status(204).json([]);
});