import { rateLimitsCollection } from "./_mongodb-connect";
import { MongoRateLimitsModel } from "../models/global/MongoRateLimitsModel";

export const rateLimitsRepository = {
  async createRateLimit(
    rateLimit: MongoRateLimitsModel
  ): Promise<MongoRateLimitsModel> {
    await rateLimitsCollection.insertOne(rateLimit);
    return rateLimit;
  },

  async updateCounter(
    ip: string,
    endpoint: string,
    attemptsCount: number
  ): Promise<boolean> {
    const result = await rateLimitsCollection.updateOne(
      { ip, endpoint },
      {
        $set: {
          attemptsCount,
        },
      }
    );
    return result.matchedCount === 1;
  },

  async deleteRateLimit(ip: string, endpoint: string): Promise<boolean> {
    const result = await rateLimitsCollection.deleteOne({ ip, endpoint });
    return result.deletedCount === 1;
  },

  async deleteAll(): Promise<boolean> {
    await rateLimitsCollection.deleteMany({});
    return (await rateLimitsCollection.countDocuments()) === 0;
  },
};