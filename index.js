const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();


app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        alllowHeaders: ["Content-type" , "Authorization"]
    })
)
// Mongodb Connect 



const uri = `mongodb+srv://${process.env.DB_USER_TASK}:${process.env.DB_USER_PASS}@cluster0.7olulz0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });

    const taskInfo = client.db('task-manager-data').collection('task-info')

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



// start server
app.use(express.json())
const PORT = process.env.PORT || 6022;

app.listen(PORT,()=>{
    console.log(`Server is Running http://${PORT}`)
})