import {
  blogCreator,
  blogReturner,
  blogsLength,
  blogUpdater,
  eraser,
  eraserWithId,
  firstBlog,
  firstBlogId,
  firstPost,
  firstPostId,
  getter,
  getterWithId,
  postCreator,
  postReturner,
  postsLength,
  postUpdater,
  secondPost,
} from "./test-functions";
import {
  basicAuthKey,
  basicAuthValue,
  blogNameString,
  blogNewDescriptionString,
  blogNewNameString,
  blogNewWebsiteUrlString,
  blogsURI,
  invalidURI,
  longString1013,
  longString109,
  longString17,
  longString39,
  longString508,
  postContentString,
  postNewTitleString,
  postShortDescriptionString,
  postsURI,
  postTitleString,
} from "./test-strings";
import { emptyOutput } from "./test-objects";
import request from "supertest";
import { app } from "../../src";

// const port = 3000;
//
// const startApp = async () => {
//   await runTestDB();
//   app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
//   });
// };
//
// startApp();

beforeAll(async () => {
  await eraser(blogsURI);
  await eraser(postsURI);
});
afterAll(async () => {
  await eraser(blogsURI);
  await eraser(postsURI);
});

describe("Blogs CRUD operations", () => {
  it("should return all blogs", async () => {
    const response = await getter(blogsURI);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(emptyOutput);
  });
  it("should create new blog", async () => {
    // Trying to create a blog
    const response = await blogCreator();
    expect(response.status).toBe(201);

    // Checking result by returning created blog
    const blog = await firstBlog();
    const returnedBlog = await blogReturner();
    expect(blog).toStrictEqual(returnedBlog);
  });
  it("should update blog", async () => {
    // Trying to update a blog
    const response = await blogUpdater();
    expect(response.status).toBe(204);
  });
  it("should return blog by ID with updated data", async () => {
    // Trying to get blog by ID
    const blogId = await firstBlogId();
    const response = await getterWithId(blogsURI, blogId);
    expect(response.status).toBe(200);

    // Checking result by returning updated blog
    const blog = await firstBlog();
    const returnedBlog = await blogReturner(
      undefined,
      blogNewNameString,
      blogNewDescriptionString,
      blogNewWebsiteUrlString
    );
    expect(blog).toStrictEqual(returnedBlog);
  });
  it("should delete blog by ID", async () => {
    // Trying to delete a blog
    const blogId = await firstBlogId();
    const response = await eraserWithId(blogsURI, blogId);
    expect(response.status).toBe(204);

    // Checking result by returning blogs array length
    const length = await blogsLength();
    expect(length).toBe(0);
  });
});

describe("Posts CRUD operations", () => {
  it("should create new blog for testing", async () => {
    // Trying to create a blog
    const response = await blogCreator();
    expect(response.status).toBe(201);

    // Checking result by returning created blog
    const blog = await firstBlog();
    const returnedBlog = await blogReturner();
    expect(blog).toStrictEqual(returnedBlog);
  });
  it("should return all posts", async () => {
    const response = await getter(postsURI);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(emptyOutput);
  });
  it("should create new post", async () => {
    // Trying to create a post
    const response = await postCreator();
    expect(response.status).toBe(201);

    // Checking result by returning created post
    const post = await firstPost();
    const returnedPost = await postReturner();
    expect(post).toStrictEqual(returnedPost);
  });
  it("should create new post for exact blog", async () => {
    // Finding blogId
    const blogId = await firstBlogId();

    // Trying to create a post
    const response = await postCreator(blogsURI + blogId + postsURI);
    expect(response.status).toBe(201);

    // Checking result by returning created post
    const post = await secondPost();
    const returnedPost = await postReturner();
    expect(post).toStrictEqual(returnedPost);

    // Checking that post is available through blog URI param
    const check = await getter(blogsURI + blogId);
    expect(check.status).toBe(200);
    expect(post).toStrictEqual(returnedPost);
  });
  it("should update post", async () => {
    // Trying to update a post
    const response = await postUpdater();
    expect(response.status).toBe(204);
  });
  it("should return post by ID with updated data", async () => {
    // Trying to get blog by ID
    const postId = await firstPostId();
    const response = await getterWithId(postsURI, postId);
    expect(response.status).toBe(200);

    // Checking result by returning updated post
    const post = await firstPost();
    const returnedPost = await postReturner(
      undefined,
      postNewTitleString,
      postShortDescriptionString,
      postContentString
    );
    expect(post).toStrictEqual(returnedPost);
  });
  it("should delete both posts", async () => {
    // Trying to delete both posts
    let i = 0;
    while (i < 2) {
      const postId = await firstPostId();
      const response = await eraserWithId(postsURI, postId);
      expect(response.status).toBe(204);
      i++;
    }

    // Checking result by returning blogs array length
    const length = await postsLength();
    expect(length).toBe(0);
  });
});

describe("Blogs validations", () => {
  it("should NOT create new blog without name", async () => {
    // Trying to create a blog without name
    const response = await blogCreator(undefined, null);
    expect(response.status).toBe(400);

    // Checking result
    const length = await blogsLength();
    expect(length).toBe(0);
  });
  it("should NOT create new blog with incorrect name type", async () => {
    // Trying to create a blog with incorrect name type
    const response = await blogCreator(undefined, 123);
    expect(response.status).toBe(400);

    // Checking result
    const length = await blogsLength();
    expect(length).toBe(0);
  });
  it("should NOT create new blog with incorrect name length", async () => {
    // Trying to create a blog with incorrect name length
    const response = await blogCreator(undefined, longString17);
    expect(response.status).toBe(400);

    // Checking result
    const length = await blogsLength();
    expect(length).toBe(0);
  });
  it("should NOT create new blog without description", async () => {
    // Trying to create a blog without description
    const response = await blogCreator(undefined, blogNameString, null);
    expect(response.status).toBe(400);

    // Checking result
    const length = await blogsLength();
    expect(length).toBe(0);
  });
  it("should NOT create new blog with incorrect description type", async () => {
    // Trying to create a blog with incorrect description type
    const response = await blogCreator(undefined, blogNameString, 123);
    expect(response.status).toBe(400);

    // Checking result
    const length = await blogsLength();
    expect(length).toBe(0);
  });
  it("should NOT create new blog with incorrect description length", async () => {
    // Trying to create a blog with incorrect description length
    const response = await blogCreator(undefined, undefined, longString508);
    expect(response.status).toBe(400);

    // Checking result
    const length = await blogsLength();
    expect(length).toBe(0);
  });
  it("should NOT create new blog without website URL", async () => {
    // Trying to create a blog without website URL
    const response = await blogCreator(undefined, undefined, undefined, null);
    expect(response.status).toBe(400);

    // Checking result
    const length = await blogsLength();
    expect(length).toBe(0);
  });
  it("should NOT create new blog with incorrect website URL type", async () => {
    // Trying to create a blog with incorrect website URL type
    const response = await blogCreator(undefined, undefined, undefined, 123);
    expect(response.status).toBe(400);

    // Checking result
    const length = await blogsLength();
    expect(length).toBe(0);
  });
  it("should NOT create new blog with incorrect website URL length", async () => {
    // Trying to create a blog with incorrect website URL length
    const response = await blogCreator(
      undefined,
      undefined,
      undefined,
      longString109
    );
    expect(response.status).toBe(400);

    // Checking result
    const length = await blogsLength();
    expect(length).toBe(0);
  });
  it("should NOT create new blog with incorrect website URL format", async () => {
    // Trying to create a blog with incorrect website URL format
    const response = await blogCreator(
      undefined,
      undefined,
      undefined,
      longString17
    );
    expect(response.status).toBe(400);

    // Checking result
    const length = await blogsLength();
    expect(length).toBe(0);
  });
});

describe("Posts validations", () => {
  it("should create new blog for posts testing", async () => {
    // Trying to create a blog
    const response = await blogCreator();
    expect(response.status).toBe(201);

    // Checking result by returning created blog
    const blog = await firstBlog();
    const returnedBlog = await blogReturner();
    expect(blog).toStrictEqual(returnedBlog);
  });
  it("should NOT create new post without title", async () => {
    // Trying to create a post without title
    const response = await postCreator(undefined, null);
    expect(response.status).toBe(400);

    // Checking result
    const length = await postsLength();
    expect(length).toBe(0);
  });
  it("should NOT create new post with incorrect title type", async () => {
    // Trying to create a post with incorrect title type
    const response = await postCreator(undefined, 123);
    expect(response.status).toBe(400);

    // Checking result
    const length = await postsLength();
    expect(length).toBe(0);
  });
  it("should NOT create new post with incorrect title length", async () => {
    // Trying to create a post with incorrect title length
    const response = await postCreator(undefined, longString39);
    expect(response.status).toBe(400);

    // Checking result
    const length = await postsLength();
    expect(length).toBe(0);
  });
  it("should NOT create new post without short description", async () => {
    // Trying to create a post without short description
    const response = await postCreator(undefined, undefined, null);
    expect(response.status).toBe(400);

    // Checking result
    const length = await postsLength();
    expect(length).toBe(0);
  });
  it("should NOT create new post with incorrect short description type", async () => {
    // Trying to create a post with incorrect short description type
    const response = await postCreator(undefined, undefined, 123);
    expect(response.status).toBe(400);

    // Checking result
    const length = await postsLength();
    expect(length).toBe(0);
  });
  it("should NOT create new post with incorrect short description length", async () => {
    // Trying to create a post with incorrect short description length
    const response = await postCreator(undefined, undefined, longString109);
    expect(response.status).toBe(400);

    // Checking result
    const length = await postsLength();
    expect(length).toBe(0);
  });
  it("should NOT create new post without content", async () => {
    // Trying to create a post without content
    const response = await postCreator(undefined, undefined, undefined, null);
    expect(response.status).toBe(400);

    // Checking result
    const length = await postsLength();
    expect(length).toBe(0);
  });
  it("should NOT create new post with incorrect content type", async () => {
    // Trying to create a post with incorrect content type
    const response = await postCreator(undefined, undefined, undefined, 123);
    expect(response.status).toBe(400);

    // Checking result
    const length = await postsLength();
    expect(length).toBe(0);
  });
  it("should NOT create new post with incorrect content length", async () => {
    // Trying to create a post with incorrect content length
    const response = await postCreator(
      undefined,
      undefined,
      undefined,
      longString1013
    );
    expect(response.status).toBe(400);

    // Checking result
    const length = await postsLength();
    expect(length).toBe(0);
  });
  it("should NOT create new post with incorrect blogId", async () => {
    // Trying to create a post with incorrect blogId
    const response = await request(app)
      .post(postsURI)
      .send({
        title: postTitleString,
        shortDescription: postShortDescriptionString,
        content: postContentString,
        blogId: "someString",
      })
      .set(basicAuthKey, basicAuthValue);
    expect(response.status).toBe(400);

    // Checking result
    const length = await postsLength();
    expect(length).toBe(0);
  });
});

describe("Blogs 404 errors checks", () => {
  it("should create new blog for testing", async () => {
    // Trying to create a blog
    const response = await blogCreator();
    expect(response.status).toBe(201);

    // Checking result by returning created blog
    const blog = await firstBlog();
    const returnedBlog = await blogReturner();
    expect(blog).toStrictEqual(returnedBlog);
  });
  it("should return 404 when getting not existing blog", async () => {
    const response = await getter(blogsURI + invalidURI);
    expect(response.status).toBe(404);
  });
  it("should return 404 when getting posts of not existing blog", async () => {
    const response = await getter(blogsURI + invalidURI + postsURI);
    expect(response.status).toBe(404);
  });
  it("should return 404 when updating not existing blog", async () => {
    const response = await blogUpdater(blogsURI + invalidURI);
    expect(response.status).toBe(404);
  });
  it("should return 404 when deleting not existing blog", async () => {
    const response = await eraser(blogsURI + invalidURI);
    expect(response.status).toBe(404);
  });
});

describe("Posts 404 errors checks", () => {
  it("should create new blog for testing", async () => {
    // Trying to create a blog
    const response = await blogCreator();
    expect(response.status).toBe(201);

    // Checking result by returning created blog
    const blog = await firstBlog();
    const returnedBlog = await blogReturner();
    expect(blog).toStrictEqual(returnedBlog);
  });
  it("should return 404 when getting not existing post", async () => {
    const response = await getter(postsURI + invalidURI);
    expect(response.status).toBe(404);
  });
  it("should return 404 when updating not existing post", async () => {
    const response = await blogUpdater(postsURI + invalidURI);
    expect(response.status).toBe(404);
  });
  it("should return 404 when deleting not existing post", async () => {
    const response = await eraser(postsURI + invalidURI);
    expect(response.status).toBe(404);
  });
});