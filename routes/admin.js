const express = require("express");
const adminController = require("../controllers/admin");
const router = express.Router();

router.get("/GetAllUsers", adminController.GetAllUsers);
router.get("/GetAllCities", adminController.GetAllCities);

module.exports = router;
