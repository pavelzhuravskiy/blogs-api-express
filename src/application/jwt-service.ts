import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { settings } from "../settings";
import { MongoUserModelWithPasswordWithId } from "../models/users/MongoUserModelWithPasswordWithId";

export const jwtService = {
  async createAccessTokenJWT(user: MongoUserModelWithPasswordWithId | null) {
    const accessToken = jwt.sign({ userId: user!._id }, settings.JWT_SECRET, {
      expiresIn: 1000, // TODO Change value to 10
    });

    return { accessToken };
  },
  async createRefreshTokenJWT(user: MongoUserModelWithPasswordWithId | null) {
    const refreshToken = jwt.sign({ userId: user!._id }, settings.JWT_SECRET, {
      expiresIn: 2000, // TODO Change value to 20
    });

    return { accessToken: refreshToken };
  },
  async getUserIdByToken(token: string) {
    try {
      const result = jwt.verify(token, settings.JWT_SECRET) as { userId: number };
      return new ObjectId(result.userId);
    } catch (error) {
      return null;
    }
  },
};