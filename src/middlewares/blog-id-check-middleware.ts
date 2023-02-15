import { body } from "express-validator";
import { blogsRepositoryMemory } from "../repositories/memory/blogs-repository-memory";

export const blogIdCheckMiddleware = body("blogId").custom(
    async value => {
      const validBlogId = await blogsRepositoryMemory.findAllBlogs()
      const isValid = validBlogId.filter(el => el!.id === value)
      if(isValid.length < 1) {
        throw new Error('Invalid blogId')
      }
      return true
    }
)