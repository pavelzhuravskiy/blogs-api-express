import { Request, Response, Router } from "express";
import { blogsRepository } from "../repositories/blogs-repository";
import { postsRepository } from "../repositories/posts-repository";

export const testingRouter = Router({});

testingRouter.delete("/all-data", (req: Request, res: Response) => {
  blogsRepository.findAllBlogs().length = 0;
  postsRepository.findAllPosts().length = 0;
  res.sendStatus(204);
});