import { Request, Response, Router } from "express";
import { blogsRepositoryMemory } from "../repositories/memory/blogs-repository-memory";
import { postsRepositoryMemory } from "../repositories/memory/posts-repository-memory";
import { BlogViewModel } from "../models/BlogViewModel";
import { PostViewModel } from "../models/PostViewModel";

export const testingRouter = Router({});

testingRouter.delete("/all-data", async (req: Request, res: Response) => {
  const emptyBlogs: BlogViewModel[] =
    await blogsRepositoryMemory.findAllBlogs();
  const emptyPosts: PostViewModel[] =
    await postsRepositoryMemory.findAllPosts();
  emptyBlogs.length = 0;
  emptyPosts.length = 0;
  res.sendStatus(204);
});