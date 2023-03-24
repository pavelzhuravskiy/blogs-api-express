import { MongoRateLimitsModel } from "../models/global/MongoRateLimitsModel";
import { rateLimitsRepository } from "../repositories/mongodb-rate-limits-repository";
import { rateLimitsQueryRepository } from "../repositories/query-repos/mongodb-rate-limits-query-repository";

export const rateLimitsService = {
  async createNewRateLimit(
    ip: string,
    endpoint: string,
    date: number,
    attemptsCount: number
  ): Promise<MongoRateLimitsModel> {
    const createdAt = new Date();
    const newRateLimit = {
      createdAt,
      ip,
      endpoint,
      lastAttempt: date,
      attemptsCount,
    };

    return rateLimitsRepository.createRateLimit(newRateLimit);
  },

  async updateLastAttempt(
    ip: string,
    endpoint: string,
    date: number
  ): Promise<boolean> {
    const rateLimit = await rateLimitsQueryRepository.findRateLimit(
      ip,
      endpoint
    );

    if (!rateLimit) {
      return false;
    }

    return rateLimitsRepository.updateLastAttempt(ip, endpoint, date);
  },

  async updateCounter(ip: string, endpoint: string): Promise<boolean> {
    const rateLimit = await rateLimitsQueryRepository.findRateLimit(
      ip,
      endpoint
    );

    if (!rateLimit) {
      return false;
    }

    const attemptsCount = rateLimit.attemptsCount + 1;

    return rateLimitsRepository.updateCounter(ip, endpoint, attemptsCount);
  },

  async deleteRateLimit(ip: string, endpoint: string): Promise<boolean> {
    return rateLimitsRepository.deleteRateLimit(ip, endpoint);
  },
};