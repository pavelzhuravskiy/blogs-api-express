import { ObjectId } from "mongodb";
import { postsRepository } from "../repositories/mongodb/mongodb-posts-repository";
import { MongoPostModelWithId } from "../models/mongodb/MongoPostModelWithId";
import { MongoPostModelWithStringId } from "../models/mongodb/MongoPostModelWithStringId";
import { MongoPostModelWithPagination } from "../models/mongodb/MongoPostModelWithPagination";
import { blogsRepository } from "../repositories/mongodb/mongodb-blogs-repository";

export const postsService = {
  // Return posts
  async findPosts(
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: string
  ): Promise<MongoPostModelWithPagination> {
    return postsRepository.findPosts(
      pageNumber,
      pageSize,
      sortBy,
      sortDirection
    );
  },

  // Return post by ID
  async findPostById(
    _id: ObjectId
  ): Promise<boolean | MongoPostModelWithStringId> {
    return postsRepository.findPostById(_id);
  },

  // Create new post
  async createNewPost(
    post: MongoPostModelWithId
  ): Promise<boolean | MongoPostModelWithStringId> {
    const blog = await blogsRepository.findBlogById(new ObjectId(post.blogId));
    if (!blog) throw new Error("No blog with this id");
    const newPost = {
      ...post,
      blogName: blog.name,
      createdat: new Date(),
    };

    return postsRepository.createNewPost(newPost);
  },

  // Update existing post
  async updatePost(
    _id: ObjectId,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ): Promise<boolean> {
    return postsRepository.updatePost(
      _id,
      title,
      shortDescription,
      content,
      blogId
    );
  },

  // Delete existing post
  async deletePost(_id: ObjectId): Promise<boolean> {
    return postsRepository.deletePost(_id);
  },

  // Delete all post
  async deleteAll(): Promise<boolean> {
    return postsRepository.deleteAll();
  },
};