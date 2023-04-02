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
  commentContentString,
  commentNewContentString,
  commentsURI,
  devicesURI,
  invalidAuthValue,
  invalidURI,
  ipString,
  loginURI,
  logoutURI,
  postContentString,
  postNewContentString,
  postNewShortDescriptionString,
  postNewTitleString,
  postShortDescriptionString,
  postsURI,
  postTitleString,
  refreshTokenURI,
  testingURI,
  userAgentChromeString,
  userEmailString,
  userLoginString,
  userPasswordString,
  usersURI,
} from "./test-strings";
import { ObjectId } from "mongodb";
import { BlogsQueryRepository } from "../src/repositories/query-repos/blogs-query-repository";
import { PostsQueryRepository } from "../src/repositories/query-repos/posts-query-repository";
import { UsersQueryRepository } from "../src/repositories/query-repos/users-query-repository";
import { CommentsQueryRepository } from "../src/repositories/query-repos/comments-query-repository";
import { SortOrder } from "mongoose";

const blogsQueryRepository = new BlogsQueryRepository();
const postsQueryRepository = new PostsQueryRepository();
const usersQueryRepository = new UsersQueryRepository();
const commentsQueryRepository = new CommentsQueryRepository();

// ---------- AUTH FUNCTIONS ----------

// User authentication
export const authentication = async (
  uri: string = loginURI,
  loginOrEmail: any = userLoginString,
  password: any = userPasswordString,
  userAgent: any = userAgentChromeString
) => {
  return request(app).post(uri).set("User-Agent", userAgent).send({
    loginOrEmail,
    password,
  });
};

// Logout
export const logout = async (uri: string = logoutURI, cookie: string) => {
  return request(app).post(uri).set("cookie", cookie);
};

// ---------- UNIVERSAL FUNCTIONS ----------

// Get all
export const getter = (uri: string) => {
  return request(app).get(uri).set(basicAuthKey, basicAuthValue);
};

// Get by id
export const getterWithId = (uri: string, id: string) => {
  return request(app).get(uri + id);
};

// Delete all (Basic auth)
export const eraser = (uri: string) => {
  return request(app).delete(uri).set(basicAuthKey, basicAuthValue);
};

// Delete by id (Basic auth)
export const eraserWithId = (
  uri: string,
  id: string,
  authValue: any = basicAuthValue
) => {
  return request(app)
    .delete(uri + id)
    .set(basicAuthKey, authValue);
};

// Delete blog or post by id (Bearer auth)
export const eraserWithIdBearer = async (
  uri: string,
  id: string,
  loginOrEmail: string = userLoginString
) => {
  const loginResponse = await authentication(undefined, loginOrEmail);
  const token = loginResponse.body.accessToken;
  return request(app)
    .delete(uri + id)
    .set(basicAuthKey, `Bearer ${token}`);
};

// Get all (Basic auth with invalid credentials)
export const getterWithInvalidCredentials = (uri: string) => {
  return request(app).get(uri).set(basicAuthKey, invalidAuthValue);
};

// ---------- BLOGS FUNCTIONS ----------

// Find blogs in repository
export const findBlogs = async (
  pageNumber: number = 1,
  pageSize: number = 10,
  sortBy: string = "createdAt",
  sortDirection: SortOrder = "desc",
  searchNameTerm: string = ""
) =>
  await blogsQueryRepository.findBlogs(
    pageNumber,
    pageSize,
    sortBy,
    sortDirection,
    searchNameTerm
  );

// Find blogs array length
export const blogsLength = async () => {
  return (await findBlogs()).items.length;
};

// Find first blog
export const firstBlog = async () => {
  return (await findBlogs()).items[0];
};

// Find first blog ID
export const firstBlogId = async () => {
  return (await findBlogs()).items[0].id;
};

// Find first blog name
export const firstBlogName = async () => {
  return (await findBlogs()).items[0].name;
};

// Create new blog
export const blogCreator = async (
  uri: string = blogsURI,
  name: any = blogNameString,
  description: any = blogDescriptionString,
  websiteUrl: any = blogWebsiteUrlString,
  authValue: any = basicAuthValue
) => {
  return request(app)
    .post(uri)
    .send({
      name,
      description,
      websiteUrl,
    })
    .set(basicAuthKey, authValue);
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
  websiteUrl: any = blogNewWebsiteUrlString,
  authValue: any = basicAuthValue
) => {
  const blogId = await firstBlogId();
  return request(app)
    .put(uri + blogId)
    .send({
      name,
      description,
      websiteUrl,
    })
    .set(basicAuthKey, authValue);
};

// ---------- POSTS FUNCTIONS ----------

// Find posts in repository
export const findPosts = async (
  pageNumber: number = 1,
  pageSize: number = 10,
  sortBy: string = "createdAt",
  sortDirection: SortOrder = "desc",
  blogId?: ObjectId
) =>
  await postsQueryRepository.findPosts(
    pageNumber,
    pageSize,
    sortBy,
    sortDirection,
    blogId
  );

// Find posts array length
export const postsLength = async () => {
  return (await findPosts()).items.length;
};

// Find first post
export const firstPost = async () => {
  return (await findPosts()).items[0];
};

// Find first post ID
export const firstPostId = async () => {
  return (await findPosts()).items[0].id;
};

// Find second post
export const secondPost = async () => {
  return (await findPosts()).items[1];
};

// Find second post
export const secondPostId = async () => {
  return (await findPosts()).items[1].id;
};

// Create new post
export const postCreator = async (
  uri: string = postsURI,
  title: any = postTitleString,
  shortDescription: any = postShortDescriptionString,
  content: any = postContentString,
  authValue: any = basicAuthValue
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
    .set(basicAuthKey, authValue);
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
  content: string = postNewContentString,
  authValue: any = basicAuthValue
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
    .set(basicAuthKey, authValue);
};

// ---------- USERS FUNCTIONS ----------

// Find users in repository
export const findUsers = async (
  pageNumber: number = 1,
  pageSize: number = 10,
  sortBy: string = "createdAt",
  sortDirection: SortOrder = "desc",
  searchLoginTerm: string = "",
  searchEmailTerm: string = ""
) =>
  await usersQueryRepository.findUsers(
    pageNumber,
    pageSize,
    sortBy,
    sortDirection,
    searchLoginTerm,
    searchEmailTerm
  );

// Find users array length
export const usersLength = async () => {
  return (await findUsers()).items.length;
};

// Find first user
export const firstUser = async () => {
  return (await findUsers()).items[0];
};

// Find first user ID
export const firstUserId = async () => {
  return (await findUsers()).items[0].id;
};

// Find first user Login
export const firstUserLogin = async () => {
  return (await findUsers()).items[0].login;
};

// Find second user
export const secondUser = async () => {
  return (await findUsers()).items[1];
};

// Create new user
export const userCreator = async (
  uri: string = usersURI,
  login: any = userLoginString,
  password: any = userPasswordString,
  email: any = userEmailString,
  authValue: any = basicAuthValue
) => {
  return request(app)
    .post(uri)
    .send({
      login,
      password,
      email,
    })
    .set(basicAuthKey, authValue);
};

// Return new user
export const userReturner = async (
  id: string = expect.any(String),
  login: string = userLoginString,
  email: string = userEmailString,
  createdAt: string = expect.any(String)
) => {
  return {
    id,
    login,
    email,
    createdAt,
  };
};

// ---------- COMMENTS FUNCTIONS ----------

// Find comments for first post
export const findComments = async (
  pageNumber: number = 1,
  pageSize: number = 10,
  sortBy: string = "createdAt",
  sortDirection: SortOrder = "desc"
) => {
  const postId = new ObjectId(await firstPostId());
  return await commentsQueryRepository.findComments(
    pageNumber,
    pageSize,
    sortBy,
    sortDirection,
    postId
  );
};

// Find comments for second post
export const findCommentsOfSecondPost = async (
  pageNumber: number = 1,
  pageSize: number = 10,
  sortBy: string = "createdAt",
  sortDirection: SortOrder = "desc"
) => {
  const postId = new ObjectId(await secondPostId());
  return await commentsQueryRepository.findComments(
    pageNumber,
    pageSize,
    sortBy,
    sortDirection,
    postId
  );
};

// Find comments array length
export const commentsLength = async () => {
  return (await findComments()).items.length;
};

// Find comments array length
export const commentsOfSecondPostLength = async () => {
  return (await findCommentsOfSecondPost()).items.length;
};

// Find first comment
export const firstComment = async () => {
  return (await findComments()).items[0];
};

// Find first comment ID
export const firstCommentId = async () => {
  return (await findComments()).items[0].id;
};

// Create new comment
export const commentCreator = async (content: any = commentContentString) => {
  const postId = await firstPostId();
  const loginResponse = await authentication();
  const token = loginResponse.body.accessToken;
  return request(app)
    .post(postsURI + postId + commentsURI)
    .send({
      content,
    })
    .set(basicAuthKey, `Bearer ${token}`);
};

// Create new comment
export const commentCreatorSecondPost = async (
  content: any = commentContentString
) => {
  const postId = await secondPostId();
  const loginResponse = await authentication();
  const token = loginResponse.body.accessToken;
  return request(app)
    .post(postsURI + postId + commentsURI)
    .send({
      content,
    })
    .set(basicAuthKey, `Bearer ${token}`);
};

// Return new comment
export const commentReturner = async (
  id: string = expect.any(String),
  content: string = commentContentString,
  createdAt: string = expect.any(String)
) => {
  const userId = await firstUserId();
  const userLogin = await firstUserLogin();
  return {
    id,
    content,
    commentatorInfo: {
      userId,
      userLogin,
    },
    createdAt,
  };
};

// Update comment
export const commentUpdater = async (
  content: string = commentNewContentString,
  loginOrEmail: string = userLoginString
) => {
  const commentId = await firstCommentId();
  const loginResponse = await authentication(undefined, loginOrEmail);
  const token = loginResponse.body.accessToken;
  return request(app)
    .put(commentsURI + commentId)
    .send({
      content,
    })
    .set(basicAuthKey, `Bearer ${token}`);
};

// Fail to create new comment (invalid URI)
export const invalidCommentCreator = async (
  content: any = commentContentString
) => {
  const loginResponse = await authentication();
  const token = loginResponse.body.accessToken;
  return request(app)
    .post(postsURI + invalidURI + commentsURI)
    .send({
      content,
    })
    .set(basicAuthKey, `Bearer ${token}`);
};

// Update comment
export const invalidCommentUpdater = async (
  content: string = commentNewContentString
) => {
  const loginResponse = await authentication();
  const token = loginResponse.body.accessToken;
  return request(app)
    .put(commentsURI + invalidURI)
    .send({
      content,
    })
    .set(basicAuthKey, `Bearer ${token}`);
};

export const eraseAll = async () => {
  await eraser(testingURI);
};

// ---------- DEVICES FUNCTIONS ----------

// Return new device
export const deviceReturner = async (
  ip: string = ipString,
  title: string = userAgentChromeString,
  lastActiveDate: string = expect.any(String),
  deviceId: string = expect.any(String)
) => {
  return {
    ip,
    title,
    lastActiveDate,
    deviceId,
  };
};

// Update refresh token
export const refreshTokenUpdater = (
  uri: string = refreshTokenURI,
  cookie: string
) => {
  return request(app).post(uri).set("cookie", cookie);
};

// ---------- COOKIE FUNCTIONS ----------

// Get all with cookie
export const getterWithCookie = (uri: string, cookie: string) => {
  return request(app).get(uri).set("cookie", cookie);
};

// Delete by id (cookie)
export const eraserWithIdWithCookie = (
  uri: string,
  id: string,
  cookie: string
) => {
  return request(app)
    .delete(uri + id)
    .set("cookie", cookie);
};

// Delete all (cookie)
export const eraserWithCookie = (uri: string = devicesURI, cookie: string) => {
  return request(app).delete(uri).set("cookie", cookie);
};