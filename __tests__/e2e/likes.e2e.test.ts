import {
  authentication,
  blogCreator,
  blogReturner,
  commentCreator,
  commentReturner,
  eraseAll,
  firstBlog,
  firstComment,
  firstPost,
  firstUser,
  getterWithId, getterWithIdWithCookie,
  likesUpdater,
  postCreator,
  postReturner,
  userCreator,
  userReturner,
} from "../../test-utils/test-functions";
import {
  commentsURI,
  likeString,
  longString17,
  noneString,
} from "../../test-utils/test-strings";

describe("Likes testing", () => {
  describe("Likes status 400-401-404 checks", () => {
    beforeAll(eraseAll);
    it("should create new blog for testing", async () => {
      // Trying to create a blog
      const response = await blogCreator();
      expect(response.status).toBe(201);

      // Checking result by returning created blog
      const blog = await firstBlog();
      const returnedBlog = await blogReturner();
      expect(blog).toStrictEqual(returnedBlog);
    });
    it("should create new post for testing", async () => {
      // Trying to create a post
      const response = await postCreator();
      expect(response.status).toBe(201);

      // Checking result by returning created post
      const post = await firstPost();
      const returnedPost = await postReturner();
      expect(post).toStrictEqual(returnedPost);
    });
    it("should create new user for testing", async () => {
      // Trying to create user
      const response = await userCreator();
      expect(response.status).toBe(201);

      // Checking result by returning created user
      const user = await firstUser();
      const returnedUser = await userReturner();
      expect(user).toStrictEqual(returnedUser);
    });

    let accessToken: string;

    it("should log in user with correct credentials", async () => {
      // Trying to authenticate with login
      const loginResponse = await authentication();
      expect(loginResponse.status).toBe(200);
      accessToken = loginResponse.body.accessToken;
    });

    let commentId: string;

    it("should create new comment", async () => {
      // Trying to create comment with authenticated user
      const response = await commentCreator(accessToken);
      expect(response.status).toBe(201);

      // Checking result by returning created post
      const comment = await firstComment();
      const returnedComment = await commentReturner();
      expect(comment).toStrictEqual(returnedComment);

      commentId = comment.id;
    });
    it("should NOT update like status with incorrect data", async () => {
      // Trying to update like status with incorrect data
      const response = await likesUpdater(accessToken, commentId, longString17);
      expect(response.status).toBe(400);

      // Checking result
      const checkResponse = await getterWithId(commentsURI, commentId);
      expect(checkResponse.body.likesInfo.myStatus).toBe(noneString);
    });
    it("should NOT update like status with incorrect credentials", async () => {
      // Trying to update like status with incorrect data
      const response = await likesUpdater(longString17, commentId, likeString);
      expect(response.status).toBe(401);

      // Checking result
      const checkResponse = await getterWithId(commentsURI, commentId);
      expect(checkResponse.body.likesInfo.myStatus).toBe(noneString);
    });
    it("should NOT update like status with incorrect comment ID", async () => {
      // Trying to update like status with incorrect data
      const response = await likesUpdater(accessToken, longString17, likeString);
      expect(response.status).toBe(404);

      // Checking result
      const checkResponse = await getterWithId(commentsURI, commentId);
      expect(checkResponse.body.likesInfo.myStatus).toBe(noneString);
    });
  });
  describe("Likes operations", () => {
    beforeAll(eraseAll);
    it("should create new blog for testing", async () => {
      // Trying to create a blog
      const response = await blogCreator();
      expect(response.status).toBe(201);

      // Checking result by returning created blog
      const blog = await firstBlog();
      const returnedBlog = await blogReturner();
      expect(blog).toStrictEqual(returnedBlog);
    });
    it("should create new post for testing", async () => {
      // Trying to create a post
      const response = await postCreator();
      expect(response.status).toBe(201);

      // Checking result by returning created post
      const post = await firstPost();
      const returnedPost = await postReturner();
      expect(post).toStrictEqual(returnedPost);
    });
    it("should create new user for testing", async () => {
      // Trying to create user
      const response = await userCreator();
      expect(response.status).toBe(201);

      // Checking result by returning created user
      const user = await firstUser();
      const returnedUser = await userReturner();
      expect(user).toStrictEqual(returnedUser);
    });

    let accessToken: string;
    let refreshToken: string;


    it("should log in user with correct credentials", async () => {
      // Trying to authenticate with login
      const loginResponse = await authentication();
      expect(loginResponse.status).toBe(200);
      accessToken = loginResponse.body.accessToken;
      refreshToken = loginResponse.headers["set-cookie"][0]
      console.log(loginResponse.headers)
    });

    let commentId: string;

    it("should create new comment", async () => {
      // Trying to create comment with authenticated user
      const response = await commentCreator(accessToken);
      expect(response.status).toBe(201);

      // Checking result by returning created post
      const comment = await firstComment();
      const returnedComment = await commentReturner();
      expect(comment).toStrictEqual(returnedComment);

      commentId = comment.id;
    });
    it("should update like status with correct data", async () => {
      // Trying to update like status with correct data
      const response = await likesUpdater(accessToken, commentId, likeString);
      expect(response.status).toBe(204);

      // Checking result
      const checkResponse = await getterWithIdWithCookie(commentsURI, commentId, refreshToken);
      expect(checkResponse.body.likesInfo.myStatus).toBe(likeString)
    });
  });
});