import {
  beforeAllFunc,
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
  foundBlogsObj,
  foundPostsObj,
  getter,
  getterWithId,
  postCreator,
  postReturner,
  postsLength,
  postUpdater,
} from "../../test-utils/test-functions";
import {
  basicAuthKey,
  basicAuthValue,
  blogFilterString01,
  blogFilterString02,
  blogFilterString03,
  blogFilterString04,
  blogFilterString05,
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
  postNewContentString,
  postNewShortDescriptionString,
  postNewTitleString,
  postShortDescriptionString,
  postsURI,
  postTitleString,
  sortingString02,
  sortingString04,
  sortingString05,
  sortingString07,
  sortingString09,
} from "../../test-utils/test-strings";
import { emptyOutput } from "../../test-utils/test-objects";
import request from "supertest";
import { app } from "../../src";
import { client } from "../../src/repositories/mongodb/_mongodb-connect";

afterAll(async () => {
  await client.close();
});

describe("Blogs CRUD operations", () => {
  beforeAll(beforeAllFunc);
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
  beforeAll(beforeAllFunc);
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
  it("should update post", async () => {
    // Trying to update a post
    const response = await postUpdater();
    expect(response.status).toBe(204);
  });
  it("should return post by ID with updated data", async () => {
    // Trying to get post by ID
    const postId = await firstPostId();
    const response = await getterWithId(postsURI, postId);
    expect(response.status).toBe(200);

    // Checking result by returning updated post
    const post = await firstPost();
    const returnedPost = await postReturner(
      undefined,
      postNewTitleString,
      postNewShortDescriptionString,
      postNewContentString
    );
    expect(post).toStrictEqual(returnedPost);
  });
  it("should delete post by ID", async () => {
    // Trying to delete both posts
    const postId = await firstPostId();
    const response = await eraserWithId(postsURI, postId);
    expect(response.status).toBe(204);

    // Checking result by returning blogs array length
    const length = await postsLength();
    expect(length).toBe(0);
  });
});

describe("Posts inside blog CR operations", () => {
  beforeAll(beforeAllFunc);
  it("should create new blog for testing", async () => {
    // Trying to create a blog
    const response = await blogCreator();
    expect(response.status).toBe(201);

    // Checking result by returning created blog
    const blog = await firstBlog();
    const returnedBlog = await blogReturner();
    expect(blog).toStrictEqual(returnedBlog);
  });
  it("should create new post for exact blog", async () => {
    // Finding blogId
    const blogId = await firstBlogId();

    // Trying to create a post
    const response = await postCreator(blogsURI + blogId + postsURI);
    expect(response.status).toBe(201);

    // Checking result by returning created post
    const post = await firstPost();
    const returnedPost = await postReturner();
    expect(post).toStrictEqual(returnedPost);

    // Checking that post is available through blog URI param
    const check = await getter(blogsURI + blogId);
    expect(check.status).toBe(200);
    expect(post).toStrictEqual(returnedPost);
  });
});

describe("Blogs validations", () => {
  beforeAll(beforeAllFunc);
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
  beforeAll(beforeAllFunc);
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
  beforeAll(beforeAllFunc);
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
  beforeAll(beforeAllFunc);
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

describe("Blogs name filtering", () => {
  beforeAll(beforeAllFunc);
  it("should return blogs with filter", async () => {
    // Trying to create 5 blogs
    await blogCreator(undefined, blogFilterString01);
    await blogCreator(undefined, blogFilterString02);
    await blogCreator(undefined, blogFilterString03);
    await blogCreator(undefined, blogFilterString04);
    const lastBlogResponse = await blogCreator(undefined, blogFilterString05);

    expect(lastBlogResponse.status).toBe(201);

    // Checking result by returning blogs array length
    const length = await blogsLength();
    expect(length).toBe(5);

    // Applying and checking filter

    const response = await getter(blogsURI);
    expect(response.status).toBe(200);

    const blogsWithQuery = await foundBlogsObj(undefined, "va");
    expect(blogsWithQuery.totalCount).toBe(3);
    expect(blogsWithQuery.items.length).toBe(3);

    // Default sorting for blogs ==> createdAt, desc
    expect(blogsWithQuery.items[0].name).toBe(blogFilterString03);
    expect(blogsWithQuery.items[1].name).toBe(blogFilterString02);
    expect(blogsWithQuery.items[2].name).toBe(blogFilterString01);
  });
});

describe("Blogs sorting", () => {
  beforeAll(beforeAllFunc);
  it("should sort blogs by any field (name for testing)", async () => {
    // Trying to create 5 blogs
    await blogCreator(undefined, sortingString07);
    await blogCreator(undefined, sortingString02);
    await blogCreator(undefined, sortingString04);
    await blogCreator(undefined, sortingString05);
    const lastBlogResponse = await blogCreator(undefined, sortingString09);

    expect(lastBlogResponse.status).toBe(201);

    // Checking result by returning blogs array length
    const length = await blogsLength();
    expect(length).toBe(5);

    const response = await getter(blogsURI);
    expect(response.status).toBe(200);

    // Applying and checking descending sorting
    const blogsWithQueryDesc = await foundBlogsObj(
      undefined,
      undefined,
      "name"
    );
    expect(blogsWithQueryDesc.items[0].name).toBe(sortingString09);
    expect(blogsWithQueryDesc.items[1].name).toBe(sortingString07);
    expect(blogsWithQueryDesc.items[2].name).toBe(sortingString05);
    expect(blogsWithQueryDesc.items[3].name).toBe(sortingString04);
    expect(blogsWithQueryDesc.items[4].name).toBe(sortingString02);

    // Applying and checking ascending sorting
    const blogsWithQueryAsc = await foundBlogsObj(
      undefined,
      undefined,
      "name",
      "asc"
    );
    expect(response.status).toBe(200);
    expect(blogsWithQueryAsc.items[0].name).toBe(sortingString02);
    expect(blogsWithQueryAsc.items[1].name).toBe(sortingString04);
    expect(blogsWithQueryAsc.items[2].name).toBe(sortingString05);
    expect(blogsWithQueryAsc.items[3].name).toBe(sortingString07);
    expect(blogsWithQueryAsc.items[4].name).toBe(sortingString09);
  });
});

describe("Posts sorting", () => {
  beforeAll(beforeAllFunc);
  it("should create new blog for testing", async () => {
    // Trying to create a blog
    const response = await blogCreator();
    expect(response.status).toBe(201);

    // Checking result by returning created blog
    const blog = await firstBlog();
    const returnedBlog = await blogReturner();
    expect(blog).toStrictEqual(returnedBlog);
  });
  it("should sort posts by any field (title for testing)", async () => {
    // Trying to create 5 posts
    await postCreator(undefined, sortingString07);
    await postCreator(undefined, sortingString02);
    await postCreator(undefined, sortingString04);
    await postCreator(undefined, sortingString05);
    const lastBlogResponse = await postCreator(undefined, sortingString09);

    expect(lastBlogResponse.status).toBe(201);

    // Checking result by returning blogs array length
    const length = await postsLength();
    expect(length).toBe(5);

    const response = await getter(postsURI);
    expect(response.status).toBe(200);

    // Applying and checking descending sorting
    const postsWithQueryDesc = await foundPostsObj(
      undefined,
      undefined,
      "title"
    );
    expect(postsWithQueryDesc.items[0].title).toBe(sortingString09);
    expect(postsWithQueryDesc.items[1].title).toBe(sortingString07);
    expect(postsWithQueryDesc.items[2].title).toBe(sortingString05);
    expect(postsWithQueryDesc.items[3].title).toBe(sortingString04);
    expect(postsWithQueryDesc.items[4].title).toBe(sortingString02);

    // Applying and checking descending sorting
    const postsWithQueryAsc = await foundPostsObj(
      undefined,
      undefined,
      "title",
      "asc"
    );
    expect(postsWithQueryAsc.items[0].title).toBe(sortingString02);
    expect(postsWithQueryAsc.items[1].title).toBe(sortingString04);
    expect(postsWithQueryAsc.items[2].title).toBe(sortingString05);
    expect(postsWithQueryAsc.items[3].title).toBe(sortingString07);
    expect(postsWithQueryAsc.items[4].title).toBe(sortingString09);
  });
});

describe("Blogs pagination", () => {
  beforeAll(beforeAllFunc);
  it("should return correct blogs pagination output", async () => {
    // Trying to create 20 blogs
    let i = 0;
    while (i < 20) {
      const response = await blogCreator(undefined, `Test name ${i}`);
      expect(response.status).toBe(201);
      i++;
    }

    // Checking pagination
    const check = await getter(blogsURI);
    expect(check.status).toBe(200);

    const blogsWithQuery = await foundBlogsObj(
      undefined,
      undefined,
      undefined,
      undefined,
      2,
      5
    );
    expect(blogsWithQuery.pagesCount).toBe(4);
    expect(blogsWithQuery.page).toBe(2);
    expect(blogsWithQuery.pageSize).toBe(5);
    expect(blogsWithQuery.totalCount).toBe(20);
    expect(blogsWithQuery.items.length).toBe(5);
  }, 30000);
});

describe("Posts pagination", () => {
  beforeAll(beforeAllFunc);
  it("should create new blog for testing", async () => {
    // Trying to create a blog
    const response = await blogCreator();
    expect(response.status).toBe(201);

    // Checking result by returning created blog
    const blog = await firstBlog();
    const returnedBlog = await blogReturner();
    expect(blog).toStrictEqual(returnedBlog);
  });
  it("should return correct posts pagination output", async () => {
    // Trying to create 20 posts
    let i = 0;
    while (i < 20) {
      const response = await postCreator(undefined, `Test title ${i}`);
      expect(response.status).toBe(201);
      i++;
    }

    // Checking pagination
    const check = await getter(postsURI);
    expect(check.status).toBe(200);
    const postsWithQuery = await foundPostsObj(
      undefined,
      undefined,
      undefined,
      undefined,
      2,
      5
    );
    expect(postsWithQuery.pagesCount).toBe(4);
    expect(postsWithQuery.page).toBe(2);
    expect(postsWithQuery.pageSize).toBe(5);
    expect(postsWithQuery.totalCount).toBe(20);
    expect(postsWithQuery.items.length).toBe(5);
  }, 30000);
});