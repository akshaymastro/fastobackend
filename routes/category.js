const express = require("express");
const multer = require("multer");
const CategoryController = require("../controllers/category");
const { upload } = require("../helpers/uploadImage");
const router = express.Router();

router.get("/", CategoryController.get);
router.get("/:id", CategoryController.getById);
router.post(
  "/newgoodtype",
  upload.single("category_image"),
  CategoryController.create
);
router.patch(
  "/updategoodtype/:id",
  upload.single("category_image"),
  CategoryController.update
);

router.delete("/deletegoodtype/:id", CategoryController.delete);

module.exports = router;
