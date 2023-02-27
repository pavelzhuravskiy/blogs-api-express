import { app } from "../index";
import request from "supertest";
import {
  basicAuthKey,
  basicAuthValue,
  blogDescriptionString,
  blogNameString,
  blogNewDescriptionString,
  blogNewNameString,
  blogNewWebsiteUrlString,
  blogsURI,
  blogWebsiteUrlString,
} from "../../__tests__/e2e/test-strings";
import {
  blogsRepository
} from "../repositories/mongodb/mongodb-blogs-repository";
import {
  postsRepository
} from "../repositories/mongodb/mongodb-posts-repository";

// Get all blogs or posts

export const getter = (uri: string) => {
    return request(app).get(uri);
};

// Get blog or post by id

export const getterWithId = (uri: string, id: string) => {
    return request(app).get(uri + id);
};

// Delete all blogs or posts

export const eraser = (uri: string) => {
  return request(app).delete(uri).set(basicAuthKey, basicAuthValue);
};

// Delete blog or post by id

export const eraserWithId = (uri: string, id: string) => {
    return request(app).delete(uri + id).set(basicAuthKey, basicAuthValue);
};

// Blogs functions

export const foundBlogsObj = async (searchNameTerm: string | null = null) => {
  return await blogsRepository.findBlogs(searchNameTerm);
};

export const blogsLength = async () => {
    return (await foundBlogsObj()).items.length
}

export const firstBlog = async () => {
  return (await foundBlogsObj()).items[0]
}

export const firstBlogId = async () => {
  return (await foundBlogsObj()).items[0].id
}

// Create new blog

export const blogCreator = async (
  uri: string = blogsURI,
  blogName: any = blogNameString,
  blogDescription: any = blogDescriptionString,
  blogWebsiteUrl: any = blogWebsiteUrlString
) => {
  return request(app)
    .post(uri)
    .send({
      name: blogName,
      description: blogDescription,
      websiteUrl: blogWebsiteUrl,
    })
    .set(basicAuthKey, basicAuthValue);
};

// Return new blog

export const blogReturner = async (
  id: string = expect.any(String),
  name: string = blogNameString,
  description: string = blogDescriptionString,
  websiteUrl: string = blogWebsiteUrlString,
  createdAt: string = expect.any(String),
  isMembership: boolean = false
) => {
  return {
    id,
    name,
    description,
    websiteUrl,
    createdAt,
    isMembership,
  };
};

// Update blog

export const blogUpdater = async (
    uri: string = blogsURI,
    blogName: any = blogNewNameString,
    blogDescription: any = blogNewDescriptionString,
    blogWebsiteUrl: any = blogNewWebsiteUrlString
) => {
  const blogId = await firstBlogId()
  return request(app)
      .put(uri + blogId)
      .send({
        name: blogName,
        description: blogDescription,
        websiteUrl: blogWebsiteUrl,
      })
      .set(basicAuthKey, basicAuthValue);
};

export const foundPostsObj = async () => {
  return await postsRepository.findPosts();
};