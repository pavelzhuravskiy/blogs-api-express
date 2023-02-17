import { MongoClient } from "mongodb";
import { PostMongoModelNoId } from "../../models/PostMongoModelNoId";
import { BlogMongoModelNoId } from "../../models/BlogMongoModelNoId";
import * as dotenv from 'dotenv'
dotenv.config()

const uri = process.env.MONGO_URI /*|| "mongodb://0.0.0.0:27017"*/ // Local connection

if (!uri) {
  throw new Error("URI not found")
}

const client = new MongoClient(uri);

const blogsAndPostsDB = client.db("bp");
export const blogsCollection =
  blogsAndPostsDB.collection<BlogMongoModelNoId>("blogs");
export const postsCollection =
  blogsAndPostsDB.collection<PostMongoModelNoId>("posts");

export async function runDB() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("bp").command({ ping: 1 });
    console.log("Connected successfully to mongo server");
  } catch {
    console.log("Connection to database failed");
    await client.close();
    // Ensures that client will close when you finish/error
  }
}