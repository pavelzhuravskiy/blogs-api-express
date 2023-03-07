import { ObjectId } from "mongodb";
import { postsRepository } from "../repositories/mongodb-posts-repository";
import { MongoPostModelWithId } from "../models/posts/MongoPostModelWithId";
import { MongoPostModelWithStringId } from "../models/posts/MongoPostModelWithStringId";
import { MongoPostModel } from "../models/posts/MongoPostModel";
import { blogsQueryRepository } from "../repositories/mongodb-blogs-query-repository";
import {
  MongoCommentModelWithStringId
} from "../models/comments/MongoCommentModelWithStringId";
import {
  postsQueryRepository
} from "../repositories/mongodb-posts-query-repository";
import {MongoCommentModel} from "../models/comments/MongoCommentModel";

export const postsService = {
  // Create new post
  async createNewPost(
    post: MongoPostModelWithId
  ): Promise<boolean | MongoPostModelWithStringId> {
    const blog = await blogsQueryRepository.findBlogById(
      new ObjectId(post.blogId)
    );
    if (!blog) {
      return false;
    }
    const newPost = {
      ...post,
      blogName: blog.name,
      createdAt: new Date().toISOString(),
    };
    return postsRepository.createNewPost(newPost);
  },

  // Create new post
  async createNewPostByBlogId(
    _id: ObjectId,
    post: MongoPostModelWithId
  ): Promise<boolean | MongoPostModelWithStringId> {
    const blog = await blogsQueryRepository.findBlogById(new ObjectId(_id));
    if (!blog) {
      return false;
    }
    const newPost = {
      ...post,
      blogId: _id.toString(),
      blogName: blog.name,
      createdAt: new Date().toISOString(),
    };
    return postsRepository.createNewPost(newPost);
  },

  // Create new comment
  async createNewCommentByPostId(
      _id: ObjectId,
      content: MongoCommentModel
  ): Promise<boolean | MongoCommentModelWithStringId> {
    const post = await postsQueryRepository.findPostById(new ObjectId(_id));
    if (!post) {
      return false;
    }
    const newComment = {
      ...content,
      commentatorInfo: {
        userId: "someId", // TODO Fix
        userLogin: "someLogin" // TODO Fix
      },
      createdAt: new Date().toISOString()
    };
    return postsRepository.createNewComment(newComment);
  },

  // Update existing post
  async updatePost(_id: ObjectId, post: MongoPostModel): Promise<boolean> {
    return postsRepository.updatePost(
      _id,
      post.title,
      post.shortDescription,
      post.content,
      post.blogId
    );
  },

  // Delete existing post
  async deletePost(_id: ObjectId): Promise<boolean> {
    return postsRepository.deletePost(_id);
  },

  // Delete all posts
  async deleteAll(): Promise<boolean> {
    return postsRepository.deleteAll();
  },
};