import { Request, Response, Router } from "express";
import { blogsRepository } from "../repositories/mongodb/mongodb-blogs-repository";
import { postsRepository } from "../repositories/mongodb/mongodb-posts-repository";

export const testingRouter = Router({});

testingRouter.delete("/all-data", async (req: Request, res: Response) => {
  await blogsRepository.deleteAll();
  await postsRepository.deleteAll();
  res.sendStatus(204);
});