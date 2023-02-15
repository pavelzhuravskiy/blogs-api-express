import { Request, Response, Router } from "express";
import { blogsRepository } from "../repositories/memory/blogs-repository-memory";
import { postsRepository } from "../repositories/memory/posts-repository-memory";
import { BlogMemoryModel } from "../models/BlogMemoryModel";
import { PostMemoryModel } from "../models/PostMemoryModel";

export const testingRouter = Router({});

testingRouter.delete("/all-data", async (req: Request, res: Response) => {
  const emptyBlogs: BlogMemoryModel[] =
    await blogsRepository.findAllBlogs();
  const emptyPosts: PostMemoryModel[] =
    await postsRepository.findAllPosts();
  emptyBlogs.length = 0;
  emptyPosts.length = 0;
  res.sendStatus(204);
});