import { body } from "express-validator";
import { blogsRepository } from "../repositories/mongodb/blogs-repository-mongodb";
// import { blogsRepository } from "../repositories/memory/blogs-repository-memory";

export const blogIdCheckMiddleware = body("blogId").custom(
    async value => {
      const validBlogId = await blogsRepository.findAllBlogs()
      const isValid = validBlogId.filter(el => el!.id === value)
      if(isValid.length < 1) {
        throw new Error('Invalid blogId')
      }
      return true
    }
)