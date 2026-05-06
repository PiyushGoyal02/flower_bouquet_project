const express = require("express");
const router = express.Router();
const { getAllUsersData }  = require("../Controllers/getAllUsersData");
const { storeContactForm } = require("../Controllers/storeContactForm");
const { auth }             = require("../MiddleWare/AuthMiddleWare");

router.get("/get-all-users-data",          getAllUsersData);
router.post("/store-contact-form", auth,   storeContactForm);

module.exports = router;