export type MongoRateLimitsModel = {
  ip: string;
  endpoint: string;
  firstAttempt: number;
  lastAttempt: number;
  attemptsCount: number;
};