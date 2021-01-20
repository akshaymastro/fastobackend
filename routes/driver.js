const express = require("express");
const driverController = require("../controllers/driver");
const router = express.Router();

//Route to get all drivers
router.get("/getdriver", driverController.getDriver);

//Route to update fields of logged in drivers
router.post("/updatedriverfields", driverController.UpdateDriverFields);

//Route to delete drivers
router.post("/deleteDriver", driverController.DeleteDriver);

//Route to update current location of drivers
router.patch("/updateUser", driverController.UpdateUser);

//Route to update profile picture url of uploaded image
router.post(
  "/updatedriverprofilepicture",
  driverController.UpdateDriverProfilePicture
);

routes.post("/getnearbyvehicals", driverController.getNearByVehicals);
module.exports = router;
