const express = require("express");
const cityController = require("../controllers/invoice");
const router = express.Router();

router.post("/newinvoice", cityController.createinvoice);
router.get("/allinvoice", cityController.getinvoice);
// router.patch("/updatecity", cityController.updateCity);
router.delete("/deleteinvoice/:_id", cityController.deleteInvoice);

module.exports = router;
