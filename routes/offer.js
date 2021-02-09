const express = require("express");
const multer = require("multer");
const OfferController = require("../controllers/offer");
const router = express.Router();

router.get("/", OfferController.getOffer);
router.post(
  "/newoffer",
  [multer().any("offer_image")],
  OfferController.createOffer
);
router.patch(
  "/updateoffer/:id",
  [multer().any("offer_image")],
  OfferController.OfferController
);

router.delete("/deleteOffer/:id", OfferController.deleteOffer);

module.exports = router;
0;
