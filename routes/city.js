const express = require("express");
const cityController = require("../controllers/city");
const router = express.Router();

router.post("/newcity", cityController.createCity);
router.get("/allcities", cityController.getCities);
router.patch("/updatecity", cityController.updateCity);
router.delete("/deletecity/:_id", cityController.deleteCity);

module.exports = router;
