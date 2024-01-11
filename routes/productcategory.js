const productsCategoryContoller = require("../controllers/productCategoryController");
const express = require("express");

const router = express.Router();

router.post("/", productsCategoryContoller.create);
router.get("/", productsCategoryContoller.getAll);
router.patch("/", productsCategoryContoller.update);
router.delete("/", productsCategoryContoller.deleteAll);
router.delete("/prodId", productsCategoryContoller.deleteOne);

module.exports = router;
