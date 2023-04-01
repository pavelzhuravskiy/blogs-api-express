import { Request, Response } from "express";
import { blogsService } from "../domain/blogs-service";
import {
  RequestWithParamsAndQuery,
  RequestWithQuery,
} from "../types/request-types";
import { QueryModel } from "../models/global/QueryModel";
import { blogsQueryRepository } from "../repositories/query-repos/blogs-query-repository";
import { SortOrder } from "mongoose";
import { ObjectId } from "mongodb";
import { postsService } from "../domain/posts-service";
import { StringIdModel } from "../models/global/StringIdModel";
import { postsQueryRepository } from "../repositories/query-repos/posts-query-repository";

class BlogsController {
  async createBlog(req: Request, res: Response) {
    const newBlog = await blogsService.createBlog(
      req.body.name,
      req.body.description,
      req.body.websiteUrl
    );
    res.status(201).json(newBlog);
  }

  async getBlogs(req: RequestWithQuery<QueryModel>, res: Response) {
    const foundBlogs = await blogsQueryRepository.findBlogs(
      Number(req.query.pageNumber) || 1,
      Number(req.query.pageSize) || 10,
      req.query.sortBy,
      req.query.sortDirection as SortOrder,
      req.query.searchNameTerm
    );
    res.json(foundBlogs);
  }

  async getBlog(req: Request, res: Response) {
    const foundBlog = await blogsQueryRepository.findBlogById(
      new ObjectId(req.params.id)
    );
    res.json(foundBlog);
  }
  async updateBlog(req: Request, res: Response) {
    const isUpdated = await blogsService.updateBlog(
      new ObjectId(req.params.id),
      req.body
    );
    if (isUpdated) {
      const updatedBlog = await blogsQueryRepository.findBlogById(req.body.id);
      res.status(204).json(updatedBlog);
    }
  }

  async deleteBlog(req: Request, res: Response) {
    console.log(req.params.id);
    const isDeleted = await blogsService.deleteBlog(
      new ObjectId(req.params.id)
    );
    if (isDeleted) {
      res.sendStatus(204);
    }
  }

  async deleteBlogs(req: Request, res: Response) {
    const isDeleted = await blogsService.deleteAll();
    if (isDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }

  async createPost(req: Request, res: Response) {
    const newPost = await postsService.createPost(
        req.body.title,
        req.body.shortDescription,
        req.body.content,
        req.params.id,
    );
    res.status(201).json(newPost);
  }

  async getPosts(
    req: RequestWithParamsAndQuery<StringIdModel, QueryModel>,
    res: Response
  ) {
    const foundPosts = await postsQueryRepository.findPosts(
      Number(req.query.pageNumber) || 1,
      Number(req.query.pageSize) || 10,
      req.query.sortBy,
      req.query.sortDirection as SortOrder,
      new ObjectId(req.params.id)
    );
    res.json(foundPosts);
  }
}

export const blogsController = new BlogsController();