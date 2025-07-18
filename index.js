const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose")
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();
const authRoutes = require('./routes/authRoutes')

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        alllowHeaders: ["Content-type" , "Authorization"]
    })
)
// Mongodb Connect 



// const uri = `mongodb+srv://${process.env.DB_USER_TASK}:${process.env.DB_USER_PASS}@cluster0.7olulz0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// jfjkldfjkl

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 10000, // optional: to control timeout
//   })
//   .then(() => {
//     console.log("✅ Connected to MongoDB");
//     app.listen(PORT, () => {
//       console.log(`🚀 Server is running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err.message);
//   });



const uri = `mongodb+srv://${process.env.DB_USER_TASK}:${process.env.DB_USER_PASS}@cluster0.7olulz0.mongodb.net/smart-task-manager?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // Wait max 10 seconds
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });


// start server
app.use(express.json())
const PORT = process.env.PORT || 6022;

app.use("/api/auth", authRoutes);



app.listen(PORT,()=>{
    console.log(`Server is Running http://${PORT}`)
})