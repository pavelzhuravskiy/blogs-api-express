import { MongoClient } from "mongodb";
import { MongoPostModel } from "../../models/mongodb/MongoPostModel";
import { MongoBlogModel } from "../../models/mongodb/MongoBlogModel";
import * as dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI; /*|| "mongodb://0.0.0.0:27017"*/ // Local connection

if (!uri) {
  throw new Error("URI not found");
}

const client = new MongoClient(uri);

const blogsAndPostsDB = client.db();
export const blogsCollection =
  blogsAndPostsDB.collection<MongoBlogModel>("blogs");
export const postsCollection =
  blogsAndPostsDB.collection<MongoPostModel>("posts");

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