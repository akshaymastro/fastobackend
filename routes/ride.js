const express = require("express");
const rideController = require("../controllers/ride");
const router = express.Router();

router.post("/", rideController.GetRideList);

router.post("/userrides", rideController.GetUserRideList);

router.post("/userride", rideController.GetUserRide);

//Route to add users
router.post("/createride", rideController.CreateRide);

//Route to delete ride
router.post("/deleteride", rideController.DeleteRide);
router.patch("/updateDriver",rideController.UpdateDriver);
module.exports = router;
