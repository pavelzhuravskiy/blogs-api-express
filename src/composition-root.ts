import "reflect-metadata";
import { BlogsRepository } from "./repositories/blogs-repository";
import { BlogsService } from "./domain/blogs-service";
import { BlogsController } from "./controllers/BlogsController";
import { PostsService } from "./domain/posts-service";
import { PostsRepository } from "./repositories/posts-repository";
import { BlogsQueryRepository } from "./repositories/query-repos/blogs-query-repository";
import { PostsQueryRepository } from "./repositories/query-repos/posts-query-repository";
import { CommentsQueryRepository } from "./repositories/query-repos/comments-query-repository";
import { CommentsService } from "./domain/comments-service";
import { PostsController } from "./controllers/PostsController";
import { UsersService } from "./domain/users-service";
import { UsersRepository } from "./repositories/users-repository";
import { AuthController } from "./controllers/AuthController";
import { DevicesService } from "./domain/devices-service";
import { DevicesRepository } from "./repositories/devices-repository";
import { JwtService } from "./application/jwt-service";
import { AuthService } from "./domain/auth-service";
import { DevicesController } from "./controllers/DevicesController";
import { DevicesQueryRepository } from "./repositories/query-repos/devices-query-repository";
import { UsersController } from "./controllers/UsersController";
import { UsersQueryRepository } from "./repositories/query-repos/users-query-repository";
import { CommentsRepository } from "./repositories/comments-repository";
import { CommentsController } from "./controllers/CommentsController";
import { TestingController } from "./controllers/TestingController";
import { RateLimitsRepository } from "./repositories/rate-limits-repository";
import { RateLimitsService } from "./domain/rate-limits-service";
import { Container } from "inversify";

export const commentsRepository = new CommentsRepository()
export const container = new Container();

container.bind(BlogsController).to(BlogsController);
container.bind(PostsController).to(PostsController);
container.bind(UsersController).to(UsersController);
container.bind(AuthController).to(AuthController);
container.bind(DevicesController).to(DevicesController);
container.bind(CommentsController).to(CommentsController);
container.bind(TestingController).to(TestingController);

container.bind(BlogsService).to(BlogsService);
container.bind(PostsService).to(PostsService);
container.bind(UsersService).to(UsersService);
container.bind(AuthService).to(AuthService);
container.bind(JwtService).to(JwtService);
container.bind(DevicesService).to(DevicesService);
container.bind(CommentsService).to(CommentsService);
container.bind(RateLimitsService).to(RateLimitsService);

container.bind(BlogsRepository).to(BlogsRepository);
container.bind(PostsRepository).to(PostsRepository);
container.bind(UsersRepository).to(UsersRepository);
container.bind(DevicesRepository).to(DevicesRepository);
container.bind(CommentsRepository).to(CommentsRepository);
container.bind(RateLimitsRepository).to(RateLimitsRepository);

container.bind(BlogsQueryRepository).to(BlogsQueryRepository);
container.bind(PostsQueryRepository).to(PostsQueryRepository);
container.bind(UsersQueryRepository).to(UsersQueryRepository);
container.bind(DevicesQueryRepository).to(DevicesQueryRepository);
container.bind(CommentsQueryRepository).to(CommentsQueryRepository);