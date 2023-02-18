import request from "supertest";
import { app } from "../../src";
import { blogsRepository } from "../../src/repositories/mongodb/blogs-repository-mongodb";
import { ObjectId } from "mongodb";

beforeAll(async () => {
  await request(app)
    .delete("/blogs")
    .set("Authorization", "Basic YWRtaW46cXdlcnR5");
});

describe("Blogs and posts testing", () => {

  it("should return all blogs", async () => {
    const response = await request(app).get("/blogs");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
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

    const foundBlogs = await blogsRepository.findAllBlogs();
    expect(foundBlogs[0]).toStrictEqual({
      _id: expect.any(ObjectId),
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

    const foundBlogs = await blogsRepository.findAllBlogs();
    expect(foundBlogs.length).toBe(1);
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

    const foundBlogs = await blogsRepository.findAllBlogs();
    expect(foundBlogs.length).toBe(1);
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

    const foundBlogs = await blogsRepository.findAllBlogs();
    expect(foundBlogs.length).toBe(1);
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

    const foundBlogs = await blogsRepository.findAllBlogs();
    expect(foundBlogs.length).toBe(1);
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

    const foundBlogs = await blogsRepository.findAllBlogs();
    expect(foundBlogs.length).toBe(1);
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

    const foundBlogs = await blogsRepository.findAllBlogs();
    expect(foundBlogs.length).toBe(1);
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

    const foundBlogs = await blogsRepository.findAllBlogs();
    expect(foundBlogs.length).toBe(1);
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

    const foundBlogs = await blogsRepository.findAllBlogs();
    expect(foundBlogs.length).toBe(1);
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

    const foundBlogs = await blogsRepository.findAllBlogs();
    expect(foundBlogs.length).toBe(1);
  });

  it("should NOT create new blog with incorrect URL format", async () => {
    // Trying to create a blog with incorrect URL length

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

    const foundBlogs = await blogsRepository.findAllBlogs();
    expect(foundBlogs.length).toBe(1);
  });

  it("should update blog", async () => {
    // Trying to update a blog

    const foundBlogs = await blogsRepository.findAllBlogs();
    // @ts-ignore
    const blogId = foundBlogs[0]._id.toString();
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
    const foundBlogs = await blogsRepository.findAllBlogs();
    // @ts-ignore
    const blogId = foundBlogs[0]._id.toString();
    const response = await request(app).get("/blogs/" + blogId);
    expect(response.status).toBe(200);
    expect(foundBlogs[0]).toStrictEqual({
      _id: new ObjectId(blogId),
      name: "New name",
      description: "New Description",
      websiteUrl: "https://github.com/somenewurl",
      createdAt: expect.any(String),
      isMembership: false,
    });
  });

  // TODO Handle 404 errors
});