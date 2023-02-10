import { BlogViewModelArray } from "../models/BlogViewModel";

const blogs: BlogViewModelArray = [];

export const blogsRepository = {
  // Return all blogs
  findAllBlogs() {
    return blogs;
  },

  // Return blog by ID
  findBlogById(id: string) {
    const foundBlog = blogs.find((blog) => blog.id === id);
    if (id) {
      return foundBlog;
    } else {
      return blogs;
    }
  },

  // Create new blog
  createNewBlog(
    id: string,
    name: string,
    description: string,
    websiteUrl: string
  ) {
    const newBlog = {
      id: id,
      name: name,
      description: description,
      websiteUrl: websiteUrl,
    };
    blogs.push(newBlog);
    return newBlog;
  },

  // Update existing blog
  updateBlog(
    name: string,
    description: string,
    websiteUrl: string
  ) {
    const blogToUpdate = blogs.find((blog) => blog.id);
    if (blogToUpdate) {
      blogToUpdate.name = name;
      blogToUpdate.description = description;
      blogToUpdate.websiteUrl = websiteUrl;
      return true;
    }
    return false;
  },

  // Delete existing blog
  deleteBlog(id: string) {
    for (let i = 0; i < blogs.length; i++) {
      if (blogs[i].id === id) {
        blogs.splice(i, 1);
        return true;
      }
    }
    return false;
  },
};