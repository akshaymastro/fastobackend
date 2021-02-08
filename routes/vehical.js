const express = require("express");
const multer = require("multer");
const VehicalController = require("../controllers/vehical");
const router = express.Router();

router.get("/", VehicalController.getVehicals);
router.post("/newvehical", VehicalController.createVehical);
router.patch("/updatevehical/:id", VehicalController.updateVehical);

router.delete("/deleteVehical/:id", VehicalController.deleteVehical);

module.exports = router;0
