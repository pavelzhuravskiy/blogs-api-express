export type MongoRateLimitsModel = {
  createdAt: Date;
  ip: string;
  endpoint: string;
  lastAttempt: number;
  attemptsCount: number;
};