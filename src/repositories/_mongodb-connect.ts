import { MongoClient } from "mongodb";
import { MongoPostModel } from "../models/posts/MongoPostModel";
import { MongoBlogModel } from "../models/blogs/MongoBlogModel";
import * as dotenv from "dotenv";
import { MongoUserModelWithPassword } from "../models/users/MongoUserModelWithPassword";
import { MongoCommentModel } from "../models/comments/MongoCommentModel";
import {MongoRefreshTokenModel} from "../models/global/MongoRefreshTokenModel";

dotenv.config();

const uri =
  process.env.NODE_ENV === "test"
    ? "mongodb://0.0.0.0:27017" // Local connection for tests
    : process.env.MONGO_URI; // Remote connection

if (!uri) {
  throw new Error("URI not found");
}

export const client = new MongoClient(uri);

const blogsAndPostsDB = client.db();
export const blogsCollection =
  blogsAndPostsDB.collection<MongoBlogModel>("blogs");
export const postsCollection =
  blogsAndPostsDB.collection<MongoPostModel>("posts");
export const usersCollection =
  blogsAndPostsDB.collection<MongoUserModelWithPassword>("users");
export const commentsCollection =
  blogsAndPostsDB.collection<MongoCommentModel>("comments");
export const refreshTokensBlacklistCollection =
    blogsAndPostsDB.collection<MongoRefreshTokenModel>("refresh-tokens-blacklist");

export async function runDB() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db().command({ ping: 1 });
    console.log("Connected successfully to mongo server");
  } catch {
    console.log("Connection to database failed");
    await client.close();
    // Ensures that client will close when you finish/error
  }
}