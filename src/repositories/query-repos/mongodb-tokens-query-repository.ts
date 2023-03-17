import { refreshTokensBlacklistCollection } from "../_mongodb-connect";
import { MongoRefreshTokenModel } from "../../models/tokens/MongoRefreshTokenModel";

export const tokensQueryRepository = {
  async findBlackListedToken(token: string): Promise<MongoRefreshTokenModel | null> {
    return await refreshTokensBlacklistCollection.findOne({
      refreshToken: token,
    });
  },
};