import { MongoIdModel } from "./MongoIdModel";
import { GlobalIdStringModel } from "../global/GlobalIdStringModel";

export type MongoBlogModel = {
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: string;
  isMembership: boolean;
};

export type MongoBlogModelWithId = MongoBlogModel & MongoIdModel;
export type MongoBlogModelWithStringId = MongoBlogModel & GlobalIdStringModel;