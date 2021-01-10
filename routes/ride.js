const express = require("express");
const rideController = require("../controllers/ride");
const router = express.Router();

//Route to get all users
router.post("/createride", rideController.CreateRide);

//Route to delete ride
router.post("/deleteride", rideController.DeleteRide);






module.exports = router;