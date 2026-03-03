const express = require("express")
const route = express.Router();

const { Signup, Signin} = require("../Controllers/AuthSection")

route.post("/signup", Signup)
route.post("/signin", Signin)

module.exports = route;
