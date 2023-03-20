import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { settings } from "../settings";
import { MongoUserModelWithPasswordWithId } from "../models/users/MongoUserModelWithPasswordWithId";
import { randomUUID } from "crypto";

export const jwtService = {
  async createAccessTokenJWT(user: MongoUserModelWithPasswordWithId | null) {
    const accessToken = jwt.sign(
      { userId: user!._id, deviceId: randomUUID() },
      settings.JWT_SECRET,
      {
        expiresIn: 1000, // TODO Fix time
      }
    );

    return { accessToken };
  },
  async createRefreshTokenJWT(user: MongoUserModelWithPasswordWithId | null) {
    return jwt.sign(
      { userId: user!._id, deviceId: randomUUID() },
      settings.JWT_SECRET,
      {
        expiresIn: 20, // TODO Fix time
      }
    );
  },
  async getUserIdByToken(token: string) {
    try {
      const result = jwt.verify(token, settings.JWT_SECRET) as {
        userId: number;
        deviceId: string
      };
      return new ObjectId(result.userId);
    } catch (error) {
      return null;
    }
  },
  async getDeviceIdByToken(token: string) {
    try {
      const result = jwt.verify(token, settings.JWT_SECRET) as {
        userId: number;
        deviceId: string
      };
      return result.deviceId;
    } catch (error) {
      return null;
    }
  },
};