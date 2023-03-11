import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { settings } from "../settings";
import { MongoUserModelWithPasswordWithId } from "../models/users/MongoUserModelWithPasswordWithId";

export const jwtService = {
  async createJWT(user: MongoUserModelWithPasswordWithId | null) {
    const token = jwt.sign({ userId: user!._id }, settings.JWT_SECRET, {
      expiresIn: "1h",
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