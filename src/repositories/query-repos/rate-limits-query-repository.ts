import { RateLimitDBModel } from "../../models/database/RateLimitDBModel";
import { RateLimits } from "../../schemas/rateLimitSchema";

export const rateLimitsQueryRepository = {
  async findRateLimit(
    ip: string,
    endpoint: string
  ): Promise<RateLimitDBModel | null> {
    const foundRateLimit = await RateLimits.findOne({ ip, endpoint });

    if (!foundRateLimit) {
      return null;
    }

    return foundRateLimit;
  },
};