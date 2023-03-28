import { NextFunction, Request, Response } from "express";
import { rateLimitsService } from "../domain/rate-limits-service";
import { rateLimitsQueryRepository } from "../repositories/query-repos/mongodb-rate-limits-query-repository";
import {funcSleep} from "../functions/global/func-sleep";

export const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip = req.ip;
  const endpoint = req.originalUrl;
  let attemptsCount = 1;

  const foundLimiter = await rateLimitsQueryRepository.findRateLimit(ip, endpoint);

  setTimeout(async () => {
    await rateLimitsService.deleteRateLimit(ip, endpoint);
  }, 10000);

  if (!foundLimiter) {
    await rateLimitsService.createNewRateLimit(
        ip,
        endpoint,
        attemptsCount
    );
  } else {
    const attemptsCount = foundLimiter.attemptsCount
    if (attemptsCount >= 5) {
      res.sendStatus(429)
      await funcSleep(10000)
      return
    }
    await rateLimitsService.updateCounter(ip, endpoint)
  }

  next()

};