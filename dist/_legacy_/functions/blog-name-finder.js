"use strict";
/*
import { blogsRepository } from "../repositories/mongodb/mongodb-blogs-repository";
import { RequestWithBodyAndQuery } from "../models/global/GlobalRequestModel";
import { MongoBlogQueryModel } from "../models/mongodb/MongoBlogQueryModel";
import { MongoPostModelWithId } from "../models/mongodb/MongoPostModelWithId";

export const blogNameFinder = async (
  req: RequestWithBodyAndQuery<MongoPostModelWithId, MongoBlogQueryModel>
) => {
  const blogsObj = await blogsRepository.findBlogById(req.body._id);
  const foundBlog = blogsObj.items.find((blog) => blog.id === req.body.blogId);
  return foundBlog!.name;
};*/ 
