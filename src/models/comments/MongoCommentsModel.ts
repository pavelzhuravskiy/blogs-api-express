export type MongoCommentsModel = {
  content: string;
  "commentatorInfo": {
    "userId": string,
    "userLogin": string,
  }
  createdAt: string;
};