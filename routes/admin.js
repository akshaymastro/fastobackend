const express = require("express");
const adminController = require("../controllers/admin");
const router = express.Router();

router.get("/GetAllUsers",  adminController.GetAllUsers);

module.exports = router;