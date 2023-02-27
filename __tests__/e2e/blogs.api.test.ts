import {
  blogCreator,
  blogReturner, blogsLength,
  blogUpdater,
  eraser,
  eraserWithId,
  firstBlog,
  firstBlogId,
  getter,
  getterWithId,
} from "../../src/functions/func-tests";
import {
  blogNewDescriptionString,
  blogNewNameString,
  blogNewWebsiteUrlString,
  blogsURI,
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