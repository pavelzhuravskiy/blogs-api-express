import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { settings } from "../settings";
import { MongoUserModelWithId } from "../models/users/MongoUserModelWithId";

export const jwtService = {
  async createJWT(user: MongoUserModelWithId | null) {
    const token = jwt.sign({ userId: user!._id }, settings.JWT_SECRET, {
      expiresIn: 10,
    });

    return { accessToken: token };
  },
  async getUserIdByToken(token: string) {
    try {
      const result: any = jwt.verify(token, settings.JWT_SECRET); // TODO Fix any
      return new ObjectId(result.userId);
    } catch (error) {
      return null;
    }
  },
};