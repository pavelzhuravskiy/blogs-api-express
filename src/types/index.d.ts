import { UserDBModel } from "../models/UserDBModel";

declare global {
  declare namespace Express {
    export interface Request {
      user: UserDBModel | null;
    }
  }
}