import { ObjectId } from "mongodb";
import { PostsRepository } from "../repositories/posts-repository";
import { PostDBModel } from "../models/database/PostDBModel";
import { PostViewModel } from "../models/view/PostViewModel";
import { BlogsQueryRepository } from "../repositories/query-repos/blogs-query-repository";

export class PostsService {
  constructor(
    protected postsRepository: PostsRepository,
    protected blogsQueryRepository: BlogsQueryRepository
  ) {}
  async createPost(
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ): Promise<PostViewModel | null> {
    const blog = await this.blogsQueryRepository.findBlogById(
      new ObjectId(blogId)
    );

    if (!blog) {
      return null;
    }

    const newPost = new PostDBModel(
      new ObjectId(),
      title,
      shortDescription,
      content,
      blogId,
      blog.name,
      new Date().toISOString()
    );

    return this.postsRepository.createPost(newPost);
  }

  async updatePost(_id: ObjectId, post: PostViewModel): Promise<boolean> {
    return this.postsRepository.updatePost(
      _id,
      post.title,
      post.shortDescription,
      post.content,
      post.blogId
    );
  }

  async deletePost(_id: ObjectId): Promise<boolean> {
    return this.postsRepository.deletePost(_id);
  }

  async deleteAll(): Promise<boolean> {
    return this.postsRepository.deleteAll();
  }
}