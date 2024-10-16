const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authenticationRoutes = require("./routes/Authentication-Routes");
const notesRoutes = require("./routes/Notes-Routes");
const app = express();
const _PORT = process.env.PORT;
// Middleware
app.use(cors());
app.use(express.json());
// Connect to MongoDB
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const database = process.env.DB;
connectDB(username, password, database);
// Routes
app.use("/api/authentication", authenticationRoutes);
app.use("/api/notes", notesRoutes);
// Start server
app.listen(_PORT, () => {
    console.log(`Server running on port ${_PORT}`);
  });