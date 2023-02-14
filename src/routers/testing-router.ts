import { Request, Response, Router } from "express";
import { blogsRepositoryMemory } from "../repositories/memory/blogs-repository-memory";
import { postsRepositoryMemory } from "../repositories/memory/posts-repository-memory";

export const testingRouter = Router({});

testingRouter.delete("/all-data", (req: Request, res: Response) => {
  blogsRepositoryMemory.findAllBlogs().length = 0;
  postsRepositoryMemory.findAllPosts().length = 0;
  res.sendStatus(204);
});