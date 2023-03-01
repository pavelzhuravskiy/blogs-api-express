import { app } from "../src";
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
  postContentString,
  postNewContentString,
  postNewShortDescriptionString,
  postNewTitleString,
  postShortDescriptionString,
  postsURI,
  postTitleString,
} from "./test-strings";
import { funcFindWithQuery } from "../src/functions/func-find-with-query";
import { ObjectId } from "mongodb";
import {
  blogsCollection,
  postsCollection
} from "../src/repositories/mongodb/_mongodb-connect";
import { funcBlogMapping } from "../src/functions/func-blog-mapping";
import {funcPostMapping} from "../src/functions/func-post-mapping";

// ---------- BEFORE ALL FUNCTIONS ----------

export const beforeAllFunc = async () => {
  await eraser(blogsURI);
  await eraser(postsURI);
};

// ---------- UNIVERSAL FUNCTIONS ----------

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
  return request(app)
    .delete(uri + id)
    .set(basicAuthKey, basicAuthValue);
};

// ---------- BLOGS FUNCTIONS ----------

// Find blogs in repository
export const foundBlogsObj = async (
  blogId: ObjectId | null = null,
  searchNameTerm: null | string = null,
  sortBy: string = "createdAt",
  sortDirection: string = "desc",
  pageNumber: number = 1,
  pageSize: number = 10
) => {
  return await funcFindWithQuery(
    blogId,
    searchNameTerm,
    sortBy,
    sortDirection,
    pageNumber,
    pageSize,
    blogsCollection,
    funcBlogMapping
  );
};

// Find blogs array length
export const blogsLength = async () => {
  return (await foundBlogsObj()).items.length;
};

// Find first blog
export const firstBlog = async () => {
  return (await foundBlogsObj()).items[0];
};

// Find first blog ID
export const firstBlogId = async () => {
  return (await foundBlogsObj()).items[0].id;
};

// Find first blog name
export const firstBlogName = async () => {
  return (await foundBlogsObj()).items[0].name;
};

// Create new blog
export const blogCreator = async (
  uri: string = blogsURI,
  name: any = blogNameString,
  description: any = blogDescriptionString,
  websiteUrl: any = blogWebsiteUrlString
) => {
  return request(app)
    .post(uri)
    .send({
      name,
      description,
      websiteUrl,
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
  name: any = blogNewNameString,
  description: any = blogNewDescriptionString,
  websiteUrl: any = blogNewWebsiteUrlString
) => {
  const blogId = await firstBlogId();
  return request(app)
    .put(uri + blogId)
    .send({
      name,
      description,
      websiteUrl,
    })
    .set(basicAuthKey, basicAuthValue);
};

// ---------- POSTS FUNCTIONS ----------

// Find posts in repository
export const foundPostsObj = async (
    blogId: ObjectId | null = null,
    searchNameTerm: null | string = null,
    sortBy: string = "createdAt",
    sortDirection: string = "desc",
    pageNumber: number = 1,
    pageSize: number = 10
) => {
  return await funcFindWithQuery(
      blogId,
      searchNameTerm,
      sortBy,
      sortDirection,
      pageNumber,
      pageSize,
      postsCollection,
      funcPostMapping
  );
};

// Find posts array length
export const postsLength = async () => {
  return (await foundPostsObj()).items.length;
};

// Find first post
export const firstPost = async () => {
  return (await foundPostsObj()).items[0];
};

// Find first post ID
export const firstPostId = async () => {
  return (await foundPostsObj()).items[0].id;
};

// Create new post
export const postCreator = async (
  uri: string = postsURI,
  title: any = postTitleString,
  shortDescription: any = postShortDescriptionString,
  content: any = postContentString
) => {
  const blogId = await firstBlogId();
  return request(app)
    .post(uri)
    .send({
      title,
      shortDescription,
      content,
      blogId,
    })
    .set(basicAuthKey, basicAuthValue);
};

// Return new post
export const postReturner = async (
  id: string = expect.any(String),
  title: string = postTitleString,
  shortDescription: string = postShortDescriptionString,
  content: string = postContentString,
  createdAt: string = expect.any(String)
) => {
  const blogId = await firstBlogId();
  const blogName = await firstBlogName();
  return {
    id,
    title,
    shortDescription,
    content,
    blogId,
    blogName,
    createdAt,
  };
};

// Update post
export const postUpdater = async (
  uri: string = postsURI,
  title: string = postNewTitleString,
  shortDescription: string = postNewShortDescriptionString,
  content: string = postNewContentString
) => {
  const postId = await firstPostId();
  const blogId = await firstBlogId();
  return request(app)
    .put(uri + postId)
    .send({
      title,
      shortDescription,
      content,
      blogId,
    })
    .set(basicAuthKey, basicAuthValue);
};