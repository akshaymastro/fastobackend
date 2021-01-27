const express = require("express");
const paymentControllers = require("../controllers/payment");
const router = express.Router();

//Route to get all users
router.post("/paytm", paymentControllers.Paytm);
router.post("/callback", paymentControllers.Callback);

//Route to delete ride
// router.post("/deleteride", rideController.DeleteRide);

module.exports = router;
