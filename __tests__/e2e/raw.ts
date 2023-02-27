
//
// describe("Blogs and posts sorting", () => {
//   it("should sort blogs by any provided field (name for example)", async () => {
//     // Creating blogs
//
//     const posting_01 = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Test name 07",
//         description: "Test Description",
//         websiteUrl: "https://github.com/pavelzhuravskiy",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5");
//     expect(posting_01.status).toBe(201);
//
//     const posting_02 = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Test name 02",
//         description: "Test Description",
//         websiteUrl: "https://github.com/pavelzhuravskiy",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5");
//     expect(posting_02.status).toBe(201);
//
//     const posting_03 = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Test name 04",
//         description: "Test Description",
//         websiteUrl: "https://github.com/pavelzhuravskiy",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5");
//     expect(posting_03.status).toBe(201);
//
//     const posting_04 = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Test name 05",
//         description: "Test Description",
//         websiteUrl: "https://github.com/pavelzhuravskiy",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5");
//     expect(posting_04.status).toBe(201);
//
//     const posting_05 = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Test name 09",
//         description: "Test Description",
//         websiteUrl: "https://github.com/pavelzhuravskiy",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5");
//     expect(posting_05.status).toBe(201);
//
//     // Checking result by returning created blog
//
//     const blogs = await foundBlogsObj();
//     expect(blogs.items[0]).toStrictEqual({
//       id: expect.any(String),
//       name: "Test name 09",
//       description: "Test Description",
//       websiteUrl: "https://github.com/pavelzhuravskiy",
//       createdAt: expect.any(String),
//       isMembership: false,
//     });
//
//     // Applying and checking descending sorting
//
//     const response = await request(app).get("/blogs");
//     const blogsWithQuery = await blogsRepository.findBlogs(null, "name");
//     expect(response.status).toBe(200);
//     expect(blogsWithQuery.items[0].name).toBe("Test name 09");
//     expect(blogsWithQuery.items[1].name).toBe("Test name 07");
//     expect(blogsWithQuery.items[2].name).toBe("Test name 05");
//     expect(blogsWithQuery.items[3].name).toBe("Test name 04");
//     expect(blogsWithQuery.items[4].name).toBe("Test name 02");
//
//     // Applying and checking ascending sorting
//
//     const response2 = await request(app).get("/blogs");
//     const blogsWithQueryAsc = await blogsRepository.findBlogs(
//       null,
//       "name",
//       "asc"
//     );
//     expect(response2.status).toBe(200);
//     expect(blogsWithQueryAsc.items[0].name).toBe("Test name 02");
//     expect(blogsWithQueryAsc.items[1].name).toBe("Test name 04");
//     expect(blogsWithQueryAsc.items[2].name).toBe("Test name 05");
//     expect(blogsWithQueryAsc.items[3].name).toBe("Test name 07");
//     expect(blogsWithQueryAsc.items[4].name).toBe("Test name 09");
//   });
//   it("should sort posts by any provided field (title for example)", async () => {
//     // Creating blog
//
//     // Trying to create a blog
//
//     const posting = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Test Blog Name",
//         description: "Test Description",
//         websiteUrl: "https://github.com/pavelzhuravskiy",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5");
//     expect(posting.status).toBe(201);
//
//     // Returning blog
//
//     const blogs = await foundBlogsObj();
//     const blogId = blogs.items[0].id;
//     const blogName = blogs.items[0].name;
//
//     // Creating posts
//
//     const posting_01 = await request(app)
//       .post("/posts")
//       .send({
//         title: "Test title 03",
//         shortDescription: "Test Short Description",
//         content: "Test content",
//         blogId: blogId,
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5");
//     expect(posting_01.status).toBe(201);
//
//     const posting_02 = await request(app)
//       .post("/posts")
//       .send({
//         title: "Test title 06",
//         shortDescription: "Test Short Description",
//         content: "Test content",
//         blogId: blogId,
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5");
//     expect(posting_02.status).toBe(201);
//
//     const posting_03 = await request(app)
//       .post("/posts")
//       .send({
//         title: "Test title 01",
//         shortDescription: "Test Short Description",
//         content: "Test content",
//         blogId: blogId,
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5");
//     expect(posting_03.status).toBe(201);
//
//     const posting_04 = await request(app)
//       .post("/posts")
//       .send({
//         title: "Test title 05",
//         shortDescription: "Test Short Description",
//         content: "Test content",
//         blogId: blogId,
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5");
//     expect(posting_04.status).toBe(201);
//
//     const posting_05 = await request(app)
//       .post("/posts")
//       .send({
//         title: "Test title 08",
//         shortDescription: "Test Short Description",
//         content: "Test content",
//         blogId: blogId,
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5");
//     expect(posting_05.status).toBe(201);
//
//     // Checking result by returning created post
//
//     const posts = await foundPostsObj();
//
//     expect(posts.items[0]).toStrictEqual({
//       id: expect.any(String),
//       title: "Test title 08",
//       shortDescription: "Test Short Description",
//       content: "Test content",
//       blogId: blogId,
//       blogName: blogName,
//       createdAt: expect.any(String),
//     });
//
//     // Applying and checking descending sorting
//
//     const response = await request(app).get("/posts");
//     const postsWithQuery = await postsRepository.findPosts(1, 10, "title");
//     expect(response.status).toBe(200);
//     expect(postsWithQuery.items[0].title).toBe("Test title 08");
//     expect(postsWithQuery.items[1].title).toBe("Test title 06");
//     expect(postsWithQuery.items[2].title).toBe("Test title 05");
//     expect(postsWithQuery.items[3].title).toBe("Test title 03");
//     expect(postsWithQuery.items[4].title).toBe("Test title 01");
//
//     // Applying and checking ascending sorting
//
//     const response2 = await request(app).get("/posts");
//     const postsWithQueryAsc = await postsRepository.findPosts(
//       1,
//       10,
//       "title",
//       "asc"
//     );
//     expect(response2.status).toBe(200);
//     expect(postsWithQueryAsc.items[0].title).toBe("Test title 01");
//     expect(postsWithQueryAsc.items[1].title).toBe("Test title 03");
//     expect(postsWithQueryAsc.items[2].title).toBe("Test title 05");
//     expect(postsWithQueryAsc.items[3].title).toBe("Test title 06");
//     expect(postsWithQueryAsc.items[4].title).toBe("Test title 08");
//   });
// });
//







// describe("Blogs and posts pagination", () => {
//   it("should return correct blogs pagination output", async () => {
//     // Create 20 new blogs
//     let i = 0;
//     while (i < 20) {
//       const posting = await request(app)
//         .post("/blogs")
//         .send({
//           name: `Test Name ${i}`,
//           description: "Test Description",
//           websiteUrl: "https://github.com/pavelzhuravskiy",
//         })
//         .set("Authorization", "Basic YWRtaW46cXdlcnR5");
//       expect(posting.status).toBe(201);
//       i++;
//     }
//     // Checking result by returning created blog
//
//     const blogs = await foundBlogsObj();
//     const testName = blogs.items[0].name;
//     expect(blogs.items[0]).toStrictEqual({
//       id: expect.any(String),
//       name: testName,
//       description: "Test Description",
//       websiteUrl: "https://github.com/pavelzhuravskiy",
//       createdAt: expect.any(String),
//       isMembership: false,
//     });
//
//     // Checking pagination
//
//     const response = await request(app).get("/blogs");
//     const blogsWithQuery = await blogsRepository.findBlogs(null, "", "", 2, 5);
//     expect(response.status).toBe(200);
//     expect(blogsWithQuery.pagesCount).toBe(4);
//     expect(blogsWithQuery.page).toBe(2);
//     expect(blogsWithQuery.pageSize).toBe(5);
//     expect(blogsWithQuery.totalCount).toBe(20);
//     expect(blogsWithQuery.items.length).toBe(5);
//   });
//   it("should return correct posts pagination output", async () => {
//     // Returning all blogs
//
//     const blogs = await foundBlogsObj();
//     const blogId = blogs.items[0].id;
//     const blogName = blogs.items[0].name;
//
//     // Create 20 new posts
//     let i = 0;
//     while (i < 20) {
//       const posting = await request(app)
//         .post("/posts")
//         .send({
//           title: `Test title ${i}`,
//           shortDescription: "Test Short Description",
//           content: "Test content",
//           blogId: blogId,
//         })
//         .set("Authorization", "Basic YWRtaW46cXdlcnR5");
//       expect(posting.status).toBe(201);
//       i++;
//     }
//     // Checking result by returning created post
//
//     const posts = await foundPostsObj();
//
//     expect(posts.items[0]).toStrictEqual({
//       id: expect.any(String),
//       title: "Test title 19",
//       shortDescription: "Test Short Description",
//       content: "Test content",
//       blogId: blogId,
//       blogName: blogName,
//       createdAt: expect.any(String),
//     });
//
//     // Checking pagination
//
//     const response = await request(app).get("/posts");
//     const postsWithQuery = await postsRepository.findPosts(2, 5);
//     expect(response.status).toBe(200);
//     expect(postsWithQuery.pagesCount).toBe(4);
//     expect(postsWithQuery.page).toBe(2);
//     expect(postsWithQuery.pageSize).toBe(5);
//     expect(postsWithQuery.totalCount).toBe(20);
//     expect(postsWithQuery.items.length).toBe(5);
//   });
// });
//
// describe("Posts linked to blogs through URI param", () => {
//   it("should create new post for exact blog", async () => {
//     // Creating blog
//
//     // Trying to create a blog
//
//     const postingBlog = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Test Blog Name",
//         description: "Test Description",
//         websiteUrl: "https://github.com/pavelzhuravskiy",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5");
//     expect(postingBlog.status).toBe(201);
//
//     // Returning all blogs
//
//     const blogs = await foundBlogsObj();
//     const blogId = blogs.items[0].id;
//     const blogName = blogs.items[0].name;
//
//     // Trying to create a post
//
//     const posting = await request(app)
//       .post("/blogs/" + blogId + "/posts")
//       .send({
//         title: "Test title",
//         shortDescription: "Test Short Description",
//         content: "Test content",
//         blogId: blogId,
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5");
//     expect(posting.status).toBe(201);
//
//     // Checking result by returning created post
//
//     const posts = await foundPostsObj();
//     const postId = posts.items[0].id;
//
//     expect(posts.items[0]).toStrictEqual({
//       id: expect.any(String),
//       title: "Test title",
//       shortDescription: "Test Short Description",
//       content: "Test content",
//       blogId: blogId,
//       blogName: blogName,
//       createdAt: expect.any(String),
//     });
//
//     // Checking that post is available through blog URI param
//
//     const response = await request(app).get("/blogs/" + blogId);
//     expect(response.status).toBe(200);
//     expect(posts.items[0]).toStrictEqual({
//       id: postId,
//       title: "Test title",
//       shortDescription: "Test Short Description",
//       content: "Test content",
//       blogId: blogId,
//       blogName: blogName,
//       createdAt: expect.any(String),
//     });
//   });