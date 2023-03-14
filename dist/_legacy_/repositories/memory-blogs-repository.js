"use strict";
// import { MemoryBlogModel } from "../models/MemoryBlogModel";
//
// const blogs: MemoryBlogModel[] = [];
//
// export const blogsRepository = {
//   // Return all blogs
//   async findBlogs(): Promise<MemoryBlogModel[]> {
//     return blogs;
//   },
//
//   // Return blog by ID
//   async findBlogById(id: string): Promise<MemoryBlogModel> {
//     return blogs.find((blog) => blog?.id === id);
//   },
//
//   // Create new blog
//   async createNewBlog(
//     id: string,
//     name: string,
//     description: string,
//     websiteUrl: string
//   ): Promise<MemoryBlogModel> {
//     const newBlog = {
//       id: id,
//       name: name,
//       description: description,
//       websiteUrl: websiteUrl,
//     };
//     blogs.push(newBlog);
//     return newBlog;
//   },
//
//   // Update existing blog
//   async updateBlog(
//     id: string,
//     name: string,
//     description: string,
//     websiteUrl: string
//   ): Promise<boolean> {
//     const blogToUpdate = blogs.find((blog) => blog?.id === id);
//     if (blogToUpdate) {
//       blogToUpdate.id = id;
//       blogToUpdate.name = name;
//       blogToUpdate.description = description;
//       blogToUpdate.websiteUrl = websiteUrl;
//       return true;
//     }
//     return false;
//   },
//
//   // Delete existing blog
//   async deleteBlog(id: string): Promise<boolean> {
//     for (let i = 0; i < blogs.length; i++) {
//       if (blogs[i]?.id === id) {
//         blogs.splice(i, 1);
//         return true;
//       }
//     }
//     return false;
//   },
// };
