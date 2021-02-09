const express = require('express')
const driverController = require('../controllers/driver')
const router = express.Router()
const multer = require('multer')

//Route to get all drivers
router.get('/getdriver', driverController.getDriver)

router.get('/getdrivers', driverController.getDrivers)

//Route to update fields of logged in drivers
router.post('/updatedriverfields', driverController.UpdateDriverFields)

//Route to delete drivers
router.post('/deleteDriver', driverController.DeleteDriver)

//Route to update current location of drivers
router.patch('/updateUser', multer().any(), driverController.UpdateUser)

//Route to update profile picture url of uploaded image
router.post(
  '/updatedriverprofilepicture',
  driverController.UpdateDriverProfilePicture
)

router.post('/getnearbyvehicals', driverController.getNearByVehicals)
module.exports = router
