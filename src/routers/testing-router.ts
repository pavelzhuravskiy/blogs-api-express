import { Request, Response, Router } from "express";
import { blogsRepository } from "../repositories/mongodb-blogs-repository";
import { postsRepository } from "../repositories/mongodb-posts-repository";
import { usersRepository } from "../repositories/mongodb-users-repository";
import { commentsRepository } from "../repositories/mongodb-comments-repository";
import {devicesRepository} from "../repositories/mongodb-devices-repository";
import {
  rateLimitsRepository
} from "../repositories/mongodb-rate-limits-repository";

export const testingRouter = Router({});

testingRouter.delete("/all-data", async (req: Request, res: Response) => {
  await blogsRepository.deleteAll();
  await postsRepository.deleteAll();
  await usersRepository.deleteAll();
  await commentsRepository.deleteAll();
  await devicesRepository.deleteAll()
  await rateLimitsRepository.deleteAll()
  res.sendStatus(204);
});