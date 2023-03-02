import { Request, Response, Router } from "express";
import { blogsRepository } from "../repositories/blogs/mongodb-blogs-repository";
import { postsRepository } from "../repositories/posts/mongodb-posts-repository";
import { usersRepository } from "../repositories/users/mongodb-users-repository";

export const testingRouter = Router({});

testingRouter.delete("/all-data", async (req: Request, res: Response) => {
  await blogsRepository.deleteAll();
  await postsRepository.deleteAll();
  await usersRepository.deleteAll();
  res.sendStatus(204);
});