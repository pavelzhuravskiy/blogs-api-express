export type MongoRateLimitsModel = {
  ip: string;
  endpoint: string;
  attemptsCount: number;
};