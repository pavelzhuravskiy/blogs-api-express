import { Request, Response, Router } from "express";
import { blogsRepository } from "../repositories/blogs-repository";
import { postsRepository } from "../repositories/posts-repository";
import { usersRepository } from "../repositories/users-repository";
import { commentsRepository } from "../repositories/comments-repository";
import { devicesRepository } from "../repositories/devices-repository";
import { rateLimitsRepository } from "../repositories/mongodb-rate-limits-repository";

export const testingRouter = Router({});

testingRouter.delete("/all-data", async (req: Request, res: Response) => {
  await blogsRepository.deleteAll();
  await postsRepository.deleteAll();
  await usersRepository.deleteAll();
  await commentsRepository.deleteAll();
  await devicesRepository.deleteAll();
  await rateLimitsRepository.deleteAll();
  res.sendStatus(204);
});