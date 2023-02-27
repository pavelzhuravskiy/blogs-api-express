import {
  blogCreator,
  blogReturner, blogsLength,
  blogUpdater,
  eraser,
  eraserWithId,
  firstBlog,
  firstBlogId, firstPost, firstPostId,
  getter,
  getterWithId, postCreator, postReturner, postsLength, postUpdater,
} from "./test-functions"
import {
  blogNewDescriptionString,
  blogNewNameString,
  blogNewWebsiteUrlString,
  blogsURI, postContentString, postNewTitleString, postShortDescriptionString,
  postsURI,
} from "./test-strings";
import { emptyOutput } from "./test-objects";

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
    const length = await blogsLength()
    expect(length).toBe(0)
  });
});

describe("Posts CRUD operations", () => {
  it("should create new blog for posts testing", async () => {
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

  it("should delete post by ID", async () => {
    // Trying to delete a post
    const postId = await firstPostId();
    const response = await eraserWithId(postsURI, postId);
    expect(response.status).toBe(204);

    // Checking result by returning blogs array length
    const length = await postsLength()
    expect(length).toBe(0)
  });
});