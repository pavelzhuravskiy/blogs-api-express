import {Request, Response, Router} from "express";
import {
    blogsRepository
} from "../repositories/mongodb/blogs-repository-mongodb";
import {
    postsRepository
} from "../repositories/mongodb/posts-repository-mongodb";

export const testingRouter = Router({});

testingRouter.delete("/all-data", async (req: Request, res: Response) => {
    await blogsRepository.deleteAll()
    await postsRepository.deleteAll()
    res.sendStatus(204);
});