const express = require("express");
const authController = require("../controllers/auth");
const usercont = require("../controllers/users");
const userAuth = require("../middleware/auth");
const router = express.Router();

//route to send otp
router.post("/sendotp", authController.SendOTP);

//get user info
router.get("/getuser", userAuth, usercont.GetUser);

//Route to create user
//this api hits only when react native async otp matches entered otp
router.post("/createuser", authController.createUser);

router.post("/verifyOtp", authController.loginUser);

module.exports = router;
