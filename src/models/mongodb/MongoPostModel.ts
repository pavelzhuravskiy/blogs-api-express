import { MongoIdModel } from "./MongoIdModel";
import { GlobalIdStringModel } from "../global/GlobalIdStringModel";

export type MongoPostModel = {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: string;
};

export type MongoPostModelWithId = MongoPostModel & MongoIdModel;
export type MongoPostModelWithStringId = MongoPostModel & GlobalIdStringModel;