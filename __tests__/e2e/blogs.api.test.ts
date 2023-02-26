import request from "supertest";
import { app } from "../../src";
import { blogsRepository } from "../../src/repositories/mongodb/mongodb-blogs-repository";
import { postsRepository } from "../../src/repositories/mongodb/mongodb-posts-repository";
import { runTestDB } from "../../src/repositories/mongodb/_mongodb-test-connect";
import { ObjectId } from "mongodb";

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
  await request(app)
    .delete("/blogs")
    .set("Authorization", "Basic YWRtaW46cXdlcnR5");

  await request(app)
    .delete("/posts")
    .set("Authorization", "Basic YWRtaW46cXdlcnR5");
});

const foundBlogs = async () => {
  return await blogsRepository.findBlogs(null);
};

const foundPosts = async () => {
  return await postsRepository.findPosts();
};

describe("Blogs and posts testing", () => {
  it("should return all blogs", async () => {
    const response = await request(app).get("/blogs");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({"items": [], "page": 1, "pageSize": 10, "pagesCount": 0, "totalCount": 0});
  });

  it("should create new blog", async () => {
    // Trying to create a blog

    const posting = await request(app)
      .post("/blogs")
      .send({
        name: "Test Blog Name",
        description: "Test Description",
        websiteUrl: "https://github.com/pavelzhuravskiy",
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(posting.status).toBe(201);

    // Checking result by returning created blog

    const blogs = await foundBlogs();
    expect(blogs.items[0]).toStrictEqual({
      id: expect.any(String),
      name: "Test Blog Name",
      description: "Test Description",
      websiteUrl: "https://github.com/pavelzhuravskiy",
      createdAt: expect.any(String),
      isMembership: false,
    });
  });

  it("should NOT create new blog without name", async () => {
    // Trying to create a blog without name

    const posting = await request(app)
      .post("/blogs")
      .send({
        description: "Test Description",
        websiteUrl: "https://github.com/pavelzhuravskiy",
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(posting.status).toBe(400);

    // Checking result

    const blogs = await foundBlogs();
    expect(blogs.items.length).toBe(1);
  });

  it("should NOT create new blog with incorrect name type", async () => {
    // Trying to create a blog with incorrect name type

    const posting = await request(app)
      .post("/blogs")
      .send({
        name: 123,
        description: "Test Description",
        websiteUrl: "https://github.com/pavelzhuravskiy",
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(posting.status).toBe(400);

    // Checking result

    const blogs = await foundBlogs();
    expect(blogs.items.length).toBe(1);
  });

  it("should NOT create new blog with incorrect name length", async () => {
    // Trying to create a blog with incorrect name length

    const posting = await request(app)
      .post("/blogs")
      .send({
        name: "thisIsALongTestString",
        description: "Test Description",
        websiteUrl: "https://github.com/pavelzhuravskiy",
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(posting.status).toBe(400);

    // Checking result

    const blogs = await foundBlogs();
    expect(blogs.items.length).toBe(1);
  });

  it("should NOT create new blog without description", async () => {
    // Trying to create a blog without description

    const posting = await request(app)
      .post("/blogs")
      .send({
        name: "name",
        websiteUrl: "https://github.com/pavelzhuravskiy",
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(posting.status).toBe(400);

    // Checking result

    const blogs = await foundBlogs();
    expect(blogs.items.length).toBe(1);
  });

  it("should NOT create new blog with incorrect description type", async () => {
    // Trying to create a blog with incorrect description type

    const posting = await request(app)
      .post("/blogs")
      .send({
        name: "name",
        description: 123,
        websiteUrl: "https://github.com/pavelzhuravskiy",
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(posting.status).toBe(400);

    // Checking result

    const blogs = await foundBlogs();
    expect(blogs.items.length).toBe(1);
  });

  it("should NOT create new blog with incorrect description length", async () => {
    // Trying to create a blog with incorrect description length

    const posting = await request(app)
      .post("/blogs")
      .send({
        name: "name",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        websiteUrl: "https://github.com/pavelzhuravskiy",
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(posting.status).toBe(400);

    // Checking result

    const blogs = await foundBlogs();
    expect(blogs.items.length).toBe(1);
  });

  it("should NOT create new blog without URL", async () => {
    // Trying to create a blog without URL

    const posting = await request(app)
      .post("/blogs")
      .send({
        name: "name",
        description: "Test Description",
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(posting.status).toBe(400);

    // Checking result

    const blogs = await foundBlogs();
    expect(blogs.items.length).toBe(1);
  });

  it("should NOT create new blog with incorrect URL type", async () => {
    // Trying to create a blog with incorrect URL type

    const posting = await request(app)
      .post("/blogs")
      .send({
        name: "name",
        description: "Test Description",
        websiteUrl: 123,
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(posting.status).toBe(400);

    // Checking result

    const blogs = await foundBlogs();
    expect(blogs.items.length).toBe(1);
  });

  it("should NOT create new blog with incorrect URL length", async () => {
    // Trying to create a blog with incorrect URL length

    const posting = await request(app)
      .post("/blogs")
      .send({
        name: "name",
        description: "description",
        websiteUrl:
          "https://github.com/pavelzhuravskiypavelzhuravskiypavelzhuravskiypavelzhuravskiypavelzhuravskiypavelzhuravskiy",
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(posting.status).toBe(400);

    // Checking result

    const blogs = await foundBlogs();
    expect(blogs.items.length).toBe(1);
  });

  it("should NOT create new blog with incorrect URL format", async () => {
    // Trying to create a blog with incorrect URL format

    const posting = await request(app)
      .post("/blogs")
      .send({
        name: "name",
        description: "description",
        websiteUrl: "incorrectString",
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(posting.status).toBe(400);

    // Checking result

    const blogs = await foundBlogs();
    expect(blogs.items.length).toBe(1);
  });

  it("should update blog", async () => {
    // Trying to update a blog

    const blogs = await foundBlogs();
    const blogId = blogs.items[0].id

    const updating = await request(app)
      .put("/blogs/" + blogId)
      .send({
        name: "New name",
        description: "New Description",
        websiteUrl: "https://github.com/somenewurl",
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(updating.status).toBe(204);
  });

  it("should return blog by ID with updated data", async () => {
    const blogs = await foundBlogs();
    const blogId = blogs.items[0].id

    const response = await request(app).get("/blogs/" + blogId);
    expect(response.status).toBe(200);
    expect(blogs.items[0]).toStrictEqual({
      id: blogId,
      name: "New name",
      description: "New Description",
      websiteUrl: "https://github.com/somenewurl",
      createdAt: expect.any(String),
      isMembership: false,
    });
  });

  it("should return 404 when getting not existing blog", async () => {
    const response = await request(app).get("/blogs/-100");
    expect(response.status).toBe(404);
  });

  it("should return 404 when updating not existing blog", async () => {
    // Trying to update a blog

    const updating = await request(app)
      .put("/blogs/-100")
      .send({
        name: "New name",
        description: "New Description",
        websiteUrl: "https://github.com/somenewurl",
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(updating.status).toBe(404);
  });

  it("should return 404 when deleting not existing blog", async () => {
    const response = await request(app)
      .delete("/blogs/-100")
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(response.status).toBe(404);
  });

  it("should return all posts", async () => {
    const response = await request(app).get("/posts");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({"items": [], "page": 1, "pageSize": 10, "pagesCount": 0, "totalCount": 0});
  });

  it("should create new post", async () => {
    // Returning all blogs

    const blogs = await foundBlogs();
    const blogId = blogs.items[0].id
    const blogName = blogs.items[0].name;

    // Trying to create a post

    const posting = await request(app)
      .post("/posts")
      .send({
        title: "Test title",
        shortDescription: "Test Short Description",
        content: "Test content",
        blogId: blogId,
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(posting.status).toBe(201);

    // Checking result by returning created blog

    const posts = await foundPosts();

    expect(posts.items[0]).toStrictEqual({
      id: expect.any(String),
      title: "Test title",
      shortDescription: "Test Short Description",
      content: "Test content",
      blogId: blogId,
      blogName: blogName,
      createdAt: expect.any(String),
    });
  });

  it("should NOT create new post with incorrect BlogId", async () => {
    // Trying to create a post with incorrect Blog ID

    const posting = await request(app)
      .post("/posts")
      .send({
        title: "Test title",
        shortDescription: "Test Short Description",
        content: "Test content",
        blogId: "somestring",
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(posting.status).toBe(400);

    // Checking result

    const posts = await foundPosts();
    expect(posts.items.length).toBe(1);
  });

  it("should NOT create new post without title", async () => {
    // Trying to create a post without title

    const blogs = await foundBlogs();
    const blogId = blogs.items[0].id

    const posting = await request(app)
      .post("/posts")
      .send({
        shortDescription: "Test Short Description",
        content: "Test content",
        blogId: blogId,
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(posting.status).toBe(400);

    // Checking result

    const posts = await foundPosts();
    expect(posts.items.length).toBe(1);
  });

  it("should NOT create new post with incorrect title type", async () => {
    // Trying to create a post with incorrect title type

    const blogs = await foundBlogs();
    const blogId = blogs.items[0].id

    const posting = await request(app)
      .post("/posts")
      .send({
        title: 123,
        shortDescription: "Test Short Description",
        content: "Test content",
        blogId: blogId,
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(posting.status).toBe(400);

    // Checking result

    const posts = await foundPosts();
    expect(posts.items.length).toBe(1);
  });

  it("should NOT create new post with incorrect title length", async () => {
    // Trying to create a post with incorrect title length

    const blogs = await foundBlogs();
    const blogId = blogs.items[0].id

    const posting = await request(app)
      .post("/posts")
      .send({
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        shortDescription: "Test Short Description",
        content: "Test content",
        blogId: blogId,
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(posting.status).toBe(400);

    // Checking result

    const posts = await foundPosts();
    expect(posts.items.length).toBe(1);
  });

  it("should NOT create new post without short description", async () => {
    // Trying to create a post without short description

    const blogs = await foundBlogs();
    const blogId = blogs.items[0].id

    const posting = await request(app)
      .post("/posts")
      .send({
        title: "Test title",
        content: "Test content",
        blogId: blogId,
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(posting.status).toBe(400);

    // Checking result

    const posts = await foundPosts();
    expect(posts.items.length).toBe(1);
  });

  it("should NOT create new post with incorrect short description type", async () => {
    // Trying to create a post with incorrect short description type

    const blogs = await foundBlogs();
    const blogId = blogs.items[0].id

    const posting = await request(app)
      .post("/posts")
      .send({
        title: "Test title",
        shortDescription: 123,
        content: "Test content",
        blogId: blogId,
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(posting.status).toBe(400);

    // Checking result

    const posts = await foundPosts();
    expect(posts.items.length).toBe(1);
  });

  it("should NOT create new post with incorrect short description length", async () => {
    // Trying to create a post with incorrect short description length

    const blogs = await foundBlogs();
    const blogId = blogs.items[0].id

    const posting = await request(app)
      .post("/posts")
      .send({
        title: "Test title",
        shortDescription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        content: "Test content",
        blogId: blogId,
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(posting.status).toBe(400);

    // Checking result

    const posts = await foundPosts();
    expect(posts.items.length).toBe(1);
  });

  it("should NOT create new post without content", async () => {
    // Trying to create a post without content

    const blogs = await foundBlogs();
    const blogId = blogs.items[0].id

    const posting = await request(app)
      .post("/posts")
      .send({
        title: "Test title",
        shortDescription: "Test Short Description",
        blogId: blogId,
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(posting.status).toBe(400);

    // Checking result

    const posts = await foundPosts();
    expect(posts.items.length).toBe(1);
  });

  it("should NOT create new post with incorrect content type", async () => {
    // Trying to create a post with incorrect content type

    const blogs = await foundBlogs();
    const blogId = blogs.items[0].id

    const posting = await request(app)
      .post("/posts")
      .send({
        title: "Test title",
        shortDescription: "Test Short Description",
        content: 123,
        blogId: blogId,
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(posting.status).toBe(400);

    // Checking result

    const posts = await foundPosts();
    expect(posts.items.length).toBe(1);
  });

  it("should NOT create new post with incorrect content length", async () => {
    // Trying to create a post with incorrect content length

    const blogs = await foundBlogs();
    const blogId = blogs.items[0].id

    const posting = await request(app)
      .post("/posts")
      .send({
        title: "Test title",
        shortDescription: "Test Short Description",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
        blogId: blogId,
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(posting.status).toBe(400);

    // Checking result

    const posts = await foundPosts();
    expect(posts.items.length).toBe(1);
  });

  it("should update post", async () => {
    // Trying to update a post

    const blogs = await foundBlogs();
    const posts = await foundPosts();

    const blogId = blogs.items[0].id
    const postId = posts.items[0].id

    const updating = await request(app)
      .put("/posts/" + postId)
      .send({
        title: "New title",
        shortDescription: "New short description",
        content: "New content",
        blogId: blogId,
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(updating.status).toBe(204);
  });

  it("should return post by ID with updated data", async () => {
    const blogs = await foundBlogs();
    const posts = await foundPosts();

    const blogId = blogs.items[0].id
    const blogName = blogs.items[0].name;
    const postId = posts.items[0].id

    const response = await request(app).get("/posts/" + postId);
    expect(response.status).toBe(200);
    expect(posts.items[0]).toStrictEqual({
      id: postId,
      title: "New title",
      shortDescription: "New short description",
      content: "New content",
      blogId: blogId,
      blogName: blogName,
      createdAt: expect.any(String),
    });
  });

  it("should return 404 when getting not existing post", async () => {
    const response = await request(app).get("/posts/-100");
    expect(response.status).toBe(404);
  });

  it("should return 404 when updating not existing post", async () => {
    // Trying to update a post

    const blogs = await foundBlogs();
    const blogId = blogs.items[0].id

    const updating = await request(app)
      .put("/posts/-100")
      .send({
        title: "New title",
        shortDescription: "New short description",
        content: "New content",
        blogId: blogId,
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(updating.status).toBe(404);
  });

  it("should return 404 when deleting not existing post", async () => {
    const response = await request(app)
      .delete("/posts/-100")
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(response.status).toBe(404);
  });

  it("should delete post by ID", async () => {
    const posts = await foundPosts();
    const postId = posts.items[0].id

    const response = await request(app)
      .delete("/posts/" + postId)
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(response.status).toBe(204);
  });

  it("should delete blog by ID", async () => {
    const blogs = await foundBlogs();
    const blogId = blogs.items[0].id

    const response = await request(app)
      .delete("/blogs/" + blogId)
      .set("Authorization", "Basic YWRtaW46cXdlcnR5");
    expect(response.status).toBe(204);
  });

  it("should return empty post array", async () => {
    const posts = await foundPosts();
    const response = await request(app).get("/posts/");
    expect(response.status).toBe(200);
    expect(posts.items.length).toBe(0);
  });

  it("should return empty blog array", async () => {
    const blogs = await foundBlogs();
    const response = await request(app).get("/blogs/");
    expect(response.status).toBe(200);
    expect(blogs.items.length).toBe(0);
  });
});

// TODO FIx
// TODO Pagination
// TODO Filter
// TODO Sorting