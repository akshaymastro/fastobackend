const express = require("express");
const userController = require("../controllers/users");
const router = express.Router();

//Route to update fields of logged in user
router.post("/updatefields", userController.UpdateFields);

//Route to update fields of logged in user
router.post("/getuser", userController.GetUser);

//Route to delete user
router.post("/deleteuser", userController.DeleteUser);

//Route to update current location of user
router.post("/updatecurrentlocation", userController.UpdateCurrentLocation);

//Route to update profile picture url of uploaded image
router.patch("/updateUser", userController.UpdateUser);

module.exports = router;
