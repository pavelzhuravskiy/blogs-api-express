import { MongoClient } from "mongodb";
import { MongoPostModel } from "../models/posts/MongoPostModel";
import { BlogDBModel } from "../models/blogs/BlogDBModel";
import * as dotenv from "dotenv";
import { MongoUserModelWithPassword } from "../models/users/MongoUserModelWithPassword";
import { MongoCommentModel } from "../models/comments/MongoCommentModel";
import { MongoDeviceModel } from "../models/devices/MongoDeviceModel";
import { MongoRateLimitsModel } from "../models/global/MongoRateLimitsModel";
import mongoose from "mongoose";

dotenv.config();

const mongoURI = process.env.MONGO_URI
const mongooseURI = process.env.MONGOOSE_URI || "mongodb://0.0.0.0:27017"

const uri =
  process.env.NODE_ENV === "test"
    ? "mongodb://0.0.0.0:27017" // Local connection for tests
    : mongoURI; // Remote connection

if (!uri) {
  throw new Error("URI not found");
}

export const client = new MongoClient(uri);

const blogsAndPostsDB = client.db();
export const blogsCollection =
  blogsAndPostsDB.collection<BlogDBModel>("blogs");
export const postsCollection =
  blogsAndPostsDB.collection<MongoPostModel>("posts");
export const usersCollection =
  blogsAndPostsDB.collection<MongoUserModelWithPassword>("users");
export const commentsCollection =
  blogsAndPostsDB.collection<MongoCommentModel>("comments");
export const devicesCollection =
  blogsAndPostsDB.collection<MongoDeviceModel>("devices");
export const rateLimitsCollection =
  blogsAndPostsDB.collection<MongoRateLimitsModel>("rate_limits");

export async function runDB() {
  try {
    // Connect the client to the server
    await client.connect();
    await mongoose.connect(mongooseURI)
    // Establish and verify connection
    await client.db().command({ ping: 1 });
    console.log("Connected successfully to mongo server");
  } catch {
    console.log("Connection to database failed");
    await client.close();
    // Ensures that client will close when you finish/error
  }
}