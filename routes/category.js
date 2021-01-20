const express = require("express");
const multer = require("multer");
const CategoryController = require("../controllers/category");
const router = express.Router();

router.get("/", CategoryController.getCategories);
router.post(
  "/newcategory",
  [multer().any("category_image")],
  CategoryController.createCategory
);
router.patch(
  "/updatecategory/:id",
  [multer().any("category_image")],
  CategoryController.updateCategory
);

router.delete("/deletecategory/:id", CategoryController.deleteCategory);
