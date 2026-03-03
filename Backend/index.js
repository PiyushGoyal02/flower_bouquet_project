require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Database Connection
const dataBase = require("./Config/DataBaseConnection");
dataBase.DbConnect();


// Routes Connection 
const AuthSection = require("./Routes/AuthRoute");
const protectedRoutes = require("./Routes/BackendProtectedRoute");

app.use("/api", protectedRoutes);
app.use("/api/v1/auth", AuthSection);

// Root Route
app.get("/", (req, res) => {
  res.send("Hello From Backend!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});