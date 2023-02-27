import { MongoClient } from "mongodb";
import { MongoPostModel } from "../../models/mongodb/MongoPostModel";
import { MongoBlogModel } from "../../models/mongodb/MongoBlogModel";

const uri = "mongodb://0.0.0.0:27017"

const client = new MongoClient(uri);

const blogsAndPostsDB = client.db("test-db");
export const blogsCollection =
  blogsAndPostsDB.collection<MongoBlogModel>("blogs");
export const postsCollection =
  blogsAndPostsDB.collection<MongoPostModel>("posts");

export async function runTestDB() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db().command({ ping: 1 });
    console.log("Connected successfully to test server");
  } catch {
    console.log("Connection to database failed");
    await client.close();
    // Ensures that client will close when you finish/error
  }
}