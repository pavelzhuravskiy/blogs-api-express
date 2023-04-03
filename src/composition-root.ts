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

const blogsQueryRepository = new BlogsQueryRepository();
const postsQueryRepository = new PostsQueryRepository();
const usersQueryRepository = new UsersQueryRepository();
const devicesQueryRepository = new DevicesQueryRepository();
const commentsQueryRepository = new CommentsQueryRepository();

const blogsRepository = new BlogsRepository();
const postsRepository = new PostsRepository();
const usersRepository = new UsersRepository();
const devicesRepository = new DevicesRepository();
const commentsRepository = new CommentsRepository();
const rateLimitsRepository = new RateLimitsRepository();

const blogsService = new BlogsService(blogsRepository);
const postService = new PostsService(blogsQueryRepository, postsRepository);
const usersService = new UsersService(usersRepository);
const authService = new AuthService(usersService, usersRepository);
const jwtService = new JwtService();
const devicesService = new DevicesService(jwtService, devicesRepository);
const commentsService = new CommentsService(
  usersService,
  postsQueryRepository,
  commentsQueryRepository,
  commentsRepository
);

export const blogsController = new BlogsController(
  blogsService,
  postService,
  blogsQueryRepository,
  postsQueryRepository
);

export const postsController = new PostsController(
  postService,
  commentsService,
  postsQueryRepository,
  commentsQueryRepository
);

export const usersController = new UsersController(
  usersService,
  usersQueryRepository
);

export const authController = new AuthController(
  usersService,
  authService,
  jwtService,
  devicesService
);

export const devicesController = new DevicesController(
  jwtService,
  devicesService,
  devicesQueryRepository
);

export const commentsController = new CommentsController(
  commentsService,
  commentsQueryRepository
);

export const testingController = new TestingController(
  blogsRepository,
  postsRepository,
  usersRepository,
  commentsRepository,
  devicesRepository,
  rateLimitsRepository
);