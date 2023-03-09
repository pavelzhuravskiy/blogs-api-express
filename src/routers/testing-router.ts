import { Request, Response, Router } from "express";
import { blogsRepository } from "../repositories/mongodb-blogs-repository";
import { postsRepository } from "../repositories/mongodb-posts-repository";
import { usersRepository } from "../repositories/mongodb-users-repository";
import { commentsRepository } from "../repositories/mongodb-comments-repository";

export const testingRouter = Router({});

testingRouter.delete("/all-data", async (req: Request, res: Response) => {
  await blogsRepository.deleteAll();
  await postsRepository.deleteAll();
  await usersRepository.deleteAll();
  await commentsRepository.deleteAll();
  res.sendStatus(204);
});