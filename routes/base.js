const express = require("express");
const BaseFareController = require("../controllers/basefare");
const router = express.Router();
router.post("/addclass",BaseFareController.createFuel);
router.post("/addclassfare", BaseFareController.createfare);
router.post("/getfare", BaseFareController.getfare);
router.patch("/updatefare/:id", BaseFareController.updateFare);
router.delete("/deletefare/:_id", BaseFareController.deleteFare);
router.get("/allfare",BaseFareController.getAllfare)
module.exports = router;
