const express = require("express");
const adminController = require("../controllers/admin");
const router = express.Router();

router.get("/GetAllUsers", adminController.GetAllUsers);
router.get("/GetAllCities", adminController.GetAllCities);
router.post("/create", adminController.adminCreate);
router.post("/login", adminController.adminlogin);
router.delete("/delete", adminController.adminDelete);
// router.patch("/update", adminController.adminUpdate);
router.get("/", adminController.adminList);

module.exports = router;
