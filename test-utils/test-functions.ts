import {app} from "../src";
import request from "supertest";
import {
  authURI,
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
  postContentString,
  postNewContentString,
  postNewShortDescriptionString,
  postNewTitleString,
  postShortDescriptionString,
  postsURI,
  postTitleString,
  userEmailString,
  userLoginString,
  userPasswordString,
  usersURI,
} from "./test-strings";
import {ObjectId} from "mongodb";
import {
  blogsQueryRepository
} from "../src/repositories/query-repos/mongodb-blogs-query-repository";
import {
  postsQueryRepository
} from "../src/repositories/query-repos/mongodb-posts-query-repository";
import {
  usersQueryRepository
} from "../src/repositories/query-repos/mongodb-users-query-repository";
import {
  commentsQueryRepository
} from "../src/repositories/query-repos/mongodb-comments-query-repository";

// ---------- AUTH FUNCTIONS ----------

// User authentication
export const authentication = async (
    uri: string = authURI,
    loginOrEmail: any = userLoginString,
    password: any = userPasswordString
) => {
  return request(app).post(uri).send({
    loginOrEmail,
    password,
  });
};

// ---------- UNIVERSAL FUNCTIONS ----------

// Get all
export const getter = (uri: string) => {
  return request(app).get(uri);
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
export const eraserWithId = (uri: string, id: string) => {
  return request(app)
    .delete(uri + id)
    .set(basicAuthKey, basicAuthValue);
};

// Delete blog or post by id (Bearer auth)
export const eraserWithIdBearer = async (uri: string, id: string) => {
  const loginResponse = await authentication();
  const token = loginResponse.body.accessToken;
  return request(app)
      .delete(uri + id)
      .set(basicAuthKey, `Bearer ${token}`);
};

// ---------- BLOGS FUNCTIONS ----------

// Find blogs in repository
export const foundBlogsObj = async (
  searchNameTerm: string = "",
  sortBy: string = "createdAt",
  sortDirection: string = "desc",
  pageNumber: string = "1",
  pageSize: string = "10"
) =>
  await blogsQueryRepository.findBlogs(
    searchNameTerm,
    sortBy,
    sortDirection,
    pageNumber,
    pageSize
  );

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
  sortBy: string = "createdAt",
  sortDirection: string = "desc",
  pageNumber: string = "1",
  pageSize: string = "10",
  blogId?: ObjectId
) =>
  await postsQueryRepository.findPosts(
    sortBy,
    sortDirection,
    pageNumber,
    pageSize,
    blogId
  );

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

// ---------- USERS FUNCTIONS ----------

// Find users in repository
export const foundUsersObj = async (
  searchLoginTerm: string = "",
  searchEmailTerm: string = "",
  sortBy: string = "createdAt",
  sortDirection: string = "desc",
  pageNumber: string = "1",
  pageSize: string = "10"
) =>
  await usersQueryRepository.findUsers(
    searchLoginTerm,
    searchEmailTerm,
    sortBy,
    sortDirection,
    pageNumber,
    pageSize
  );

// Find users array length
export const usersLength = async () => {
  return (await foundUsersObj()).items.length;
};

// Find first user
export const firstUser = async () => {
  return (await foundUsersObj()).items[0];
};

// Find first user ID
export const firstUserId = async () => {
  return (await foundUsersObj()).items[0].id;
};

// Find first user Login
export const firstUserLogin = async () => {
  return (await foundUsersObj()).items[0].login;
};

// Create new user
export const userCreator = async (
  uri: string = usersURI,
  login: any = userLoginString,
  password: any = userPasswordString,
  email: any = userEmailString
) => {
  return request(app)
    .post(uri)
    .send({
      login,
      password,
      email,
    })
    .set(basicAuthKey, basicAuthValue);
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

// Find comments in repository
export const foundCommentsObj = async (
  sortBy: string = "createdAt",
  sortDirection: string = "desc",
  pageNumber: string = "1",
  pageSize: string = "10"
) => {
  const postId = new ObjectId(await firstPostId());
  return await commentsQueryRepository.findComments(
    sortBy,
    sortDirection,
    pageNumber,
    pageSize,
    postId
  );
};

// Find comments array length
export const commentsLength = async () => {
  return (await foundCommentsObj()).items.length;
};

// Find first comment
export const firstComment = async () => {
  return (await foundCommentsObj()).items[0];
};

// Find first comment ID
export const firstCommentId = async () => {
  return (await foundCommentsObj()).items[0].id;
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

// Return new comment
export const commentReturner = async (
    id: string = expect.any(String),
    content: string = commentContentString,
    createdAt: string = expect.any(String)
) => {
  const userId = await firstUserId()
  const userLogin = await firstUserLogin()
  return {
    id,
    content,
    commentatorInfo: {
      userId,
      userLogin
    },
    createdAt,
  };
};

// Update post
export const commentUpdater = async (
    content: string = commentNewContentString
) => {
  const commentId = await firstCommentId()
  const loginResponse = await authentication();
  const token = loginResponse.body.accessToken;
  return request(app)
      .put(commentsURI + commentId)
      .send({
        content,
      })
      .set(basicAuthKey, `Bearer ${token}`);
};

// ---------- ERASER FUNCTION ----------

export const eraseAll = async () => {
  await eraser(blogsURI);
  await eraser(postsURI);
  await eraser(usersURI);
};