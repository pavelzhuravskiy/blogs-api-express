import { Request, Response, Router } from "express";
import { blogsRepository } from "../repositories/blogs-repository-mongodb";
import { postsRepository } from "../repositories/posts-repository-mongodb";

export const testingRouter = Router({});

testingRouter.delete("/all-data", async (req: Request, res: Response) => {
  await blogsRepository.deleteAll();
  await postsRepository.deleteAll();
  res.sendStatus(204);
});