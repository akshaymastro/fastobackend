const express = require("express");
const multer = require("multer");
const CategoryController = require("../controllers/category");
const { upload } = require("../helpers/uploadImage");
const router = express.Router();

router.get("/", CategoryController.get);
router.get("/:id", CategoryController.getById);
router.post("/", upload.single("image"), CategoryController.create);
router.patch("/:id", CategoryController.update);

router.delete("/:id", CategoryController.delete);

module.exports = router;
