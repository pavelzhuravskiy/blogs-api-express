import { refreshTokensBlacklistCollection } from "./_mongodb-connect";
import { MongoRefreshTokenModel } from "../models/global/MongoRefreshTokenModel";

export const blacklistedTokensRepository = {
  // Create new blacklisted token
  async createNewToken(
    newToken: MongoRefreshTokenModel
  ): Promise<MongoRefreshTokenModel> {
    await refreshTokensBlacklistCollection.insertOne(newToken);
    return {
      refreshToken: newToken.refreshToken,
    };
  },
};