import { MongoClient } from "mongodb";
import { MongoPostModel } from "../../models/mongodb/MongoPostModel";
import { MongoBlogModel } from "../../models/mongodb/MongoBlogModel";
import * as dotenv from "dotenv";
import { MongoUserModel } from "../../models/mongodb/MongoUserModel";

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
export const userCollection =
  blogsAndPostsDB.collection<MongoUserModel>("blogs");

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