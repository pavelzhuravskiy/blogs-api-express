import { RateLimitDBModel } from "../models/database/RateLimitDBModel";
import { RateLimits } from "../schemas/rateLimitSchema";

export const rateLimitsRepository = {
  async createRateLimit(
    rateLimit: RateLimitDBModel
  ): Promise<RateLimitDBModel> {
    await RateLimits.create(rateLimit);
    return rateLimit;
  },

  async updateCounter(
    ip: string,
    endpoint: string,
    attemptsCount: number,
    currentDate: number
  ): Promise<boolean> {
    const result = await RateLimits.updateOne(
      { ip, endpoint },
      {
        $set: {
          attemptsCount,
          lastAttempt: currentDate,
        },
      }
    );
    return result.matchedCount === 1;
  },

  async deleteRateLimit(ip: string, endpoint: string): Promise<boolean> {
    const result = await RateLimits.deleteOne({ ip, endpoint });
    return result.deletedCount === 1;
  },

  async deleteAll(): Promise<boolean> {
    await RateLimits.deleteMany({});
    return (await RateLimits.countDocuments()) === 0;
  },
};