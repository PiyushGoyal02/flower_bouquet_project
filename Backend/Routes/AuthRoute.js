const express = require("express")
const route = express.Router();

const { Signup, Signin, adminSignup, adminSignin } = require("../Controllers/AuthSection")

route.post("/signup", Signup)
route.post("/signin", Signin)
route.post("/admin/signup", adminSignup)
route.post("/admin/signin", adminSignin)

module.exports = route;
