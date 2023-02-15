import { MongoClient } from "mongodb";
import { BlogMongoModel } from "../../models/BlogMongoModel";
import { PostMongoModel } from "../../models/PostMongoModel";

const mongoURI = process.env.mongoURI || "mongodb://0.0.0.0:27017";

const client = new MongoClient(mongoURI);

const blogsAndPostsDB = client.db("bp");
export const blogsCollection =
  blogsAndPostsDB.collection<BlogMongoModel>("blogs");
export const postsCollection =
  blogsAndPostsDB.collection<PostMongoModel>("posts");

export async function runDB() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("blogs_and_posts").command({ ping: 1 });
    console.log("Connected successfully to mongo server");
  } catch {
    console.log("Connection to database failed");
    await client.close();
    // Ensures that client will close when you finish/error
  }
}