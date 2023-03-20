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
        expiresIn: "1h", // TODO Fix time
      }
    );

    return { accessToken };
  },
  async createRefreshTokenJWT(user: MongoUserModelWithPasswordWithId | null) {
    return jwt.sign(
      { userId: user!._id, deviceId: randomUUID() },
      settings.JWT_SECRET,
      {
        expiresIn: "2h", // TODO Fix time
      }
    );
  },
  async getUserIdFromToken(token: string) {
    try {
      const result = jwt.verify(token, settings.JWT_SECRET) as {
        userId: number;
      };
      return new ObjectId(result.userId);
    } catch (error) {
      return null;
    }
  },
  async getDeviceIdFromToken(token: string) {
    try {
      const result = jwt.verify(token, settings.JWT_SECRET) as {
        deviceId: string
      };
      return result.deviceId;
    } catch (error) {
      return null;
    }
  },
  async getExpirationDateFromToken(token: string) {
    try {
      const result = jwt.verify(token, settings.JWT_SECRET) as {
        exp: number
      };
      return result.exp;
    } catch (error) {
      return null;
    }
  },
  async getIssuedAtFromToken(token: string) {
    try {
      const result = jwt.verify(token, settings.JWT_SECRET) as {
        iat: number
      };
      return result.iat;
    } catch (error) {
      return null;
    }
  },
};