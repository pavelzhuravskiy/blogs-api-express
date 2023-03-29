import { WithId } from "mongodb";

export type BlogDBModel = WithId<{
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: string;
  isMembership: boolean;
}>;