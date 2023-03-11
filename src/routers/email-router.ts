import { Request, Response, Router } from "express";

export const emailRouter = Router({});

emailRouter.post("/send", async (req: Request, res: Response) => {
  // await authService.register()
  res.sendStatus(204)
});