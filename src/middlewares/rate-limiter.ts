import { NextFunction, Request, Response } from "express";
import { rateLimitsService } from "../domain/rate-limits-service";
import { rateLimitsQueryRepository } from "../repositories/query-repos/mongodb-rate-limits-query-repository";

export const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip = req.ip;
  const endpoint = req.originalUrl;

  const foundLimiter = await rateLimitsQueryRepository.findRateLimit(
    ip,
    endpoint
  );

  if (!foundLimiter) {
    await rateLimitsService.createNewRateLimit(ip, endpoint);
  } else {
    const currentDate = Date.now();
    const firstAttemptDate = foundLimiter.firstAttempt;
    const lastAttemptDate = foundLimiter.lastAttempt;
    const diffBetweenNowAndFirst = currentDate - firstAttemptDate;
    const diffBetweenNowAndLast = currentDate - lastAttemptDate;

    const attemptsCount = foundLimiter.attemptsCount;

    if (attemptsCount >= 5) {
      // Waiting timeout 5 sec
      if (diffBetweenNowAndLast < 5000) {
        res.sendStatus(429);
        return;
      } else {
        await rateLimitsService.deleteRateLimit(ip, endpoint);
      }
    }

    if (diffBetweenNowAndFirst < 10000) {
      await rateLimitsService.updateCounter(ip, endpoint, currentDate);
    } else {
      await rateLimitsService.deleteRateLimit(ip, endpoint);
      await rateLimitsService.createNewRateLimit(ip, endpoint);
    }
  }

  next();
};