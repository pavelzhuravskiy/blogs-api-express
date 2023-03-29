import { rateLimitsCollection } from "../_db-connect";
import { MongoRateLimitsModel } from "../../models/global/MongoRateLimitsModel";

export const rateLimitsQueryRepository = {
  async findRateLimit(
    ip: string,
    endpoint: string
  ): Promise<MongoRateLimitsModel | null> {
    const foundRateLimit = await rateLimitsCollection.findOne({ ip, endpoint });

    if (!foundRateLimit) {
      return null;
    }

    return foundRateLimit;
  },
};