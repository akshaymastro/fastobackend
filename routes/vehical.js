const express = require("express");
const multer = require("multer");
const VehicalController = require("../controllers/vehical");
const router = express.Router();

router.get("/", VehicalController.getVehicals);
router.post(
  "/newvehical",
  [multer().any("vehical_image")],
  VehicalController.createVehical
);
router.patch(
  "/updatevehical/:id",
  [multer().any("vehical_image")],
  VehicalController.updateVehical
);

router.delete("/deleteVehical/:id", VehicalController.deleteVehical);
