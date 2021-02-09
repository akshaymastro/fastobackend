const express = require("express");
const adminController = require("../controllers/admin");
const router = express.Router();

router.get("/", adminController.adminList);
router.get("/GetAllUsers", adminController.GetAllUsers);
router.get("/GetAllCities", adminController.GetAllCities);
router.post("/create", adminController.adminCreate);
router.post("/login", adminController.adminlogin);
router.delete("/delete/:id", adminController.adminDelete);
// router.patch("/update", adminController.adminUpdate);

module.exports = router;
