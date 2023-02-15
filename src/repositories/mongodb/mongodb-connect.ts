import { MongoClient } from "mongodb";

const mongoURI = process.env.mongoURI || "mongodb://0.0.0.0:27017";

export const client = new MongoClient(mongoURI);

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