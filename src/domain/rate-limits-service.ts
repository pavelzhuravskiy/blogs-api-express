import { RateLimitDBModel } from "../models/database/RateLimitDBModel";
import { rateLimitsRepository } from "../repositories/rate-limits-repository";
import { ObjectId } from "mongodb";

class RateLimitsService {
  async findRateLimit(
    ip: string,
    endpoint: string
  ): Promise<RateLimitDBModel | null> {
    return rateLimitsRepository.findRateLimit(ip, endpoint);
  }

  async createRateLimit(
    ip: string,
    endpoint: string
  ): Promise<RateLimitDBModel> {
    const newRateLimit = new RateLimitDBModel(
      new ObjectId(),
      ip,
      endpoint,
      Date.now(),
      Date.now(),
      1
    );

    return rateLimitsRepository.createRateLimit(newRateLimit);
  }

  async updateCounter(
    ip: string,
    endpoint: string,
    currentDate: number
  ): Promise<boolean> {
    const rateLimit = await rateLimitsRepository.findRateLimit(ip, endpoint);

    if (!rateLimit) {
      return false;
    }

    const attemptsCount = rateLimit.attemptsCount + 1;

    return rateLimitsRepository.updateCounter(
      ip,
      endpoint,
      attemptsCount,
      currentDate
    );
  }

  async deleteRateLimit(ip: string, endpoint: string): Promise<boolean> {
    return rateLimitsRepository.deleteRateLimit(ip, endpoint);
  }
}

export const rateLimitsService = new RateLimitsService();