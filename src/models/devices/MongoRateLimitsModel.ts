export type MongoRateLimitsModel = {
  ip: string;
  endpoint: string;
  lastAttempt: number;
  attemptsCount: number
};