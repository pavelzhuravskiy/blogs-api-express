import jwt from "jsonwebtoken";
import { settings } from "../settings";
import { MongoUserModelWithPasswordWithId } from "../models/users/MongoUserModelWithPasswordWithId";
import { randomUUID } from "crypto";

export const jwtService = {
  async createAccessTokenJWT(
    user: MongoUserModelWithPasswordWithId | null,
    deviceId: string = randomUUID()
  ) {
    const accessToken = jwt.sign(
      { userId: user!._id, deviceId },
      settings.JWT_SECRET,
      {
        expiresIn: 10,
      }
    );

    return { accessToken };
  },
  async createRefreshTokenJWT(
    user: MongoUserModelWithPasswordWithId | null,
    deviceId: string = randomUUID()
  ) {
    return jwt.sign(
      { userId: user!._id, deviceId },
      settings.JWT_SECRET,
      {
        expiresIn: 20,
      }
    );
  },

  async verifyToken(token: string) {
    try {
      return jwt.verify(token, settings.JWT_SECRET) as {
        userId: number;
        deviceId: string;
        iat: number;
        exp: number;
      };
    } catch (error) {
      return null;
    }
  },
};