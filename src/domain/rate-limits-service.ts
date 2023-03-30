import { MongoRateLimitsModel } from "../models/global/MongoRateLimitsModel";
import { rateLimitsRepository } from "../repositories/mongodb-rate-limits-repository";
import { rateLimitsQueryRepository } from "../repositories/query-repos/mongodb-rate-limits-query-repository";

export const rateLimitsService = {
  async createNewRateLimit(
    ip: string,
    endpoint: string,
  ): Promise<MongoRateLimitsModel> {
    const newRateLimit = {
      ip,
      endpoint,
      firstAttempt: Date.now(),
      lastAttempt: Date.now(),
      attemptsCount: 1,
    };

    return rateLimitsRepository.createRateLimit(newRateLimit);
  },

  async updateCounter(ip: string, endpoint: string, currentDate: number): Promise<boolean> {
    const rateLimit = await rateLimitsQueryRepository.findRateLimit(
      ip,
      endpoint,
    );

    if (!rateLimit) {
      return false;
    }

    const attemptsCount = rateLimit.attemptsCount + 1;

    return rateLimitsRepository.updateCounter(ip, endpoint, attemptsCount, currentDate);
  },

  async deleteRateLimit(ip: string, endpoint: string): Promise<boolean> {
    return rateLimitsRepository.deleteRateLimit(ip, endpoint);
  },
};