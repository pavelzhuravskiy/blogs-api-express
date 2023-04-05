import { Request, Response } from "express";
import { BlogsRepository } from "../repositories/blogs-repository";
import { PostsRepository } from "../repositories/posts-repository";
import { UsersRepository } from "../repositories/users-repository";
import { CommentsRepository } from "../repositories/comments-repository";
import { DevicesRepository } from "../repositories/devices-repository";
import { RateLimitsRepository } from "../repositories/rate-limits-repository";

export class TestingController {
  constructor(
    protected blogsRepository: BlogsRepository,
    protected postsRepository: PostsRepository,
    protected usersRepository: UsersRepository,
    protected commentsRepository: CommentsRepository,
    protected devicesRepository: DevicesRepository,
    protected rateLimitsRepository: RateLimitsRepository
  ) {}
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