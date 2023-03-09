import { MongoUserModelWithId } from "../models/users/MongoUserModelWithId";

declare global {
  declare namespace Express {
    export interface Request {
      user: MongoUserModelWithId | null;
    }
  }
}