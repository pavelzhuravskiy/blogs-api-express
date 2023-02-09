import express from "express";
import { blogsRouter } from "./routers/blogs-router";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/blogs", blogsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});