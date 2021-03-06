const express = require("express");
const userController = require("../controllers/users");
const router = express.Router();

//Route to update fields of logged in user
router.patch("/updatefields", userController.UpdateFields);

//Route to update fields of logged in user
router.post("/getuser", userController.GetUser);

router.get("/userslist", userController.GetUsers);

//Route to delete user
router.post("/deleteuser", userController.DeleteUser);

//Route to update current location of user
router.post("/updatecurrentlocation", userController.UpdateCurrentLocation);

//Route to update profile picture url of uploaded image
router.patch("/updateuser", userController.UpdateUser);

router.patch("/emailVerification", userController.EmailVerification);

router.patch("/verify", userController.Verification);

router.post("/createUser",userController.createUser);

module.exports = router;
