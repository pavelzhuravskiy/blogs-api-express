import { Request, Response } from "express";
import { BlogsRepository } from "../repositories/blogs-repository";
import { PostsRepository } from "../repositories/posts-repository";
import { UsersRepository } from "../repositories/users-repository";
import { CommentsRepository } from "../repositories/comments-repository";
import { DevicesRepository } from "../repositories/devices-repository";
import { RateLimitsRepository } from "../repositories/rate-limits-repository";

class TestingController {
  private blogsRepository: BlogsRepository;
  private postsRepository: PostsRepository;
  private usersRepository: UsersRepository;
  private commentsRepository: CommentsRepository;
  private devicesRepository: DevicesRepository;
  private rateLimitsRepository: RateLimitsRepository;
  constructor() {
    this.blogsRepository = new BlogsRepository();
    this.postsRepository = new PostsRepository();
    this.usersRepository = new UsersRepository();
    this.commentsRepository = new CommentsRepository();
    this.devicesRepository = new DevicesRepository();
    this.rateLimitsRepository = new RateLimitsRepository();
  }
  async deleteEverything(req: Request, res: Response) {
    await this.blogsRepository.deleteAll();
    await this.postsRepository.deleteAll();
    await this.usersRepository.deleteAll();
    await this.commentsRepository.deleteAll();
    await this.devicesRepository.deleteAll();
    await this.rateLimitsRepository.deleteAll();
    res.sendStatus(204);
  }
}

export const testingController = new TestingController();