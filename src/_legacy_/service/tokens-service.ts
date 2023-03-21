// import { MongoRefreshTokenModel } from "../models/tokens/MongoRefreshTokenModel";
// import { blacklistedTokensRepository } from "../repositories/mongodb-tokens-repository";
// import { ObjectId } from "mongodb";
//
// export const tokensService = {
//   // Create new blacklisted refresh token
//   async createNewBlacklistedRefreshToken(
//     refreshToken: string
//   ): Promise<MongoRefreshTokenModel | null> {
//     const newToken = {
//       _id: new ObjectId(),
//       refreshToken,
//     };
//
//     return blacklistedTokensRepository.createNewToken(newToken);
//   },
//
//   // Delete all blacklisted refresh tokens
//   async deleteAll(): Promise<boolean> {
//     return blacklistedTokensRepository.deleteAll();
//   },
// };