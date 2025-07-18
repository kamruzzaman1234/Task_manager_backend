const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT || 6022;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Serve static files
app.use('/uploads', express.static('uploads'));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// MongoDB Connect
const uri = `mongodb+srv://${process.env.DB_USER_TASK}:${process.env.DB_USER_PASS}@cluster0.7olulz0.mongodb.net/smart-task-manager?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });
