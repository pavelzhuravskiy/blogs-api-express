import { refreshTokensBlacklistCollection } from "./_mongodb-connect";
import { MongoRefreshTokenModel } from "../models/tokens/MongoRefreshTokenModel";

export const blacklistedTokensRepository = {
  // Create new blacklisted token
  async createNewToken(
    newToken: MongoRefreshTokenModel
  ): Promise<MongoRefreshTokenModel> {
    await refreshTokensBlacklistCollection.insertOne(newToken);
    return newToken;
  },

  // Delete all blacklisted tokens
  async deleteAll(): Promise<boolean> {
    await refreshTokensBlacklistCollection.deleteMany({});
    return (await refreshTokensBlacklistCollection.countDocuments()) === 0;
  },
};