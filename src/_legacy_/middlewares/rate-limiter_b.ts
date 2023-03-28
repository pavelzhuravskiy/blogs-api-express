// import { NextFunction, Request, Response } from "express";
// import { rateLimitsService } from "../domain/rate-limits-service";
// import { rateLimitsQueryRepository } from "../repositories/query-repos/mongodb-rate-limits-query-repository";
//
// export const rateLimiter_b = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const ip = req.ip;
//   const endpoint = req.originalUrl;
//
//   const date = Date.now();
//   let attemptsCount = 1;
//
//   const foundRateLimitFunc = async () =>
//     await rateLimitsQueryRepository.findRateLimit(ip, endpoint);
//   const foundRateLimit = await foundRateLimitFunc();
//
//   if (!foundRateLimit) {
//     await rateLimitsService.createNewRateLimit(
//       ip,
//       endpoint,
//       date,
//       attemptsCount
//     );
//   } else {
//     const lastAttempt = foundRateLimit.lastAttempt;
//     await rateLimitsService.updateLastAttempt(ip, endpoint, date);
//
//     const timeDifference = (date - lastAttempt) / 1000;
//
//     if (timeDifference <= 10) {
//       await rateLimitsService.updateCounter(ip, endpoint);
//     }
//
//     const updatedRateLimit = await foundRateLimitFunc();
//     const updatedAttemptsCount = updatedRateLimit?.attemptsCount;
//
//     if (updatedAttemptsCount) {
//       if (updatedAttemptsCount > 5) {
//         res.sendStatus(429);
//         setTimeout(async () => {
//           await rateLimitsService.deleteRateLimit(ip, endpoint);
//         }, 1000);
//         return;
//       }
//     }
//   }
//
//   next();
// };