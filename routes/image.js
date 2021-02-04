const express = require("express");
const imageControllers = require("../controllers/imageUpload");
const router = express.Router();

//Route to get all users
router.post("/uploadImage", imageControllers.imageUpload);

//Route to delete ride
// router.post("/deleteride", rideController.DeleteRide);

module.exports = router;
