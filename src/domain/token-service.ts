import { MongoRefreshTokenModel } from "../models/global/MongoRefreshTokenModel";
import { blacklistedTokensRepository } from "../repositories/mongodb-tokens-repository";

export const tokenService = {
  // Create new blacklisted refresh token
  async createNewBlacklistedRefreshToken(
    refreshToken: string
  ): Promise<MongoRefreshTokenModel> {
    const newBlacklistedToken = {
      refreshToken,
    };
    return blacklistedTokensRepository.createNewToken(newBlacklistedToken);
  },
};