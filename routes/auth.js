const express = require("express");
const authController = require("../controllers/auth");
const usercont = require('../controllers/users');
const router = express.Router();

//route to send otp 
router.post("/sendotp",  authController.SendOTP);

//get user info
router.post("/getuser",  usercont.GetUser);

//Route to create user
//this api hits only when react native async otp matches entered otp
router.post("/createuser",  authController.createUser);

router.post("/login", authController.loginUser);

module.exports = router;