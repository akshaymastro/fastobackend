const express = require("express");
const CategoryController = require("../controllers/category");
const multer = require("multer");
const router = express.Router();

router.get("/", CategoryController.get);
router.post("/byid", CategoryController.getById);
router.post(
  "/newgoodtype",
  multer().any("category_image"),
  CategoryController.create
);
router.patch(
  "/updategoodtype/:id",
  multer().any("category_image"),
  CategoryController.update
);

router.delete("/deletegoodtype/:id", CategoryController.delete);

module.exports = router;
