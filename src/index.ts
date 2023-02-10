import express from "express";
import { blogsRouter } from "./routers/blogs-router";
import { postsRouter } from "./routers/posts-router";
import { testingRouter } from "./routers/testing_router";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/blogs", blogsRouter);
app.use("/posts", postsRouter);
app.use("/testing", testingRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});