import { MongoUserModelWithPasswordWithId } from "../models/users/MongoUserModelWithPasswordWithId";

declare global {
  declare namespace Express {
    export interface Request {
      user: MongoUserModelWithPasswordWithId | null;
    }
  }
}