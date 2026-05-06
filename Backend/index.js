require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 8000;

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Database Connection
const dataBase = require("./Config/DataBaseConnection");
dataBase.DbConnect();

// Routes Connection
const AuthSection = require("./Routes/AuthRoute");
const getAllUsersDataRoute = require("./Routes/getAllUsersDataRoute");
const addProductRoute = require("./Routes/addProductRoute");
const getAllProductsRoute = require("./Routes/getAllProductsRoute");


app.use("/api/v1/products", getAllProductsRoute);
app.use("/api/v1/users", getAllUsersDataRoute);
app.use("/api/v1/auth", AuthSection);
app.use("/api/v1/products", addProductRoute);

// Root Route
app.get("/", (req, res) => {
  res.send("Hello From Backend!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});