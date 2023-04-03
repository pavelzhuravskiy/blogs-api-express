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

const blogsQueryRepository = new BlogsQueryRepository();
const postsQueryRepository = new PostsQueryRepository();
const commentsQueryRepository = new CommentsQueryRepository();

const blogsRepository = new BlogsRepository();
const postsRepository = new PostsRepository();

const blogsService = new BlogsService(blogsRepository);
const postService = new PostsService(postsRepository, blogsQueryRepository);
const commentsService = new CommentsService();

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