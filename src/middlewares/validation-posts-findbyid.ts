import {param} from "express-validator";
import {ObjectId} from "mongodb";
import {postsService} from "../domain/posts-service";

export const validationPostsFindById = param("id").custom(async (value) => {
    const result = await postsService.findPostById(new ObjectId(value));
    if (!result) {
        throw new Error("ID not found");
    }
    return true;
});