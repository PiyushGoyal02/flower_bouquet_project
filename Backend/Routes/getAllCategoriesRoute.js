const express = require("express");
const router = express.Router();

const { getAllCategories } = require("../Controllers/getAllCategories")
router.get("/get-all-categories", getAllCategories);

module.exports = router;  