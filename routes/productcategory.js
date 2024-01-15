const productsCategoryContoller = require("../controllers/productCategoryController");
const express = require("express");

const router = express.Router();

router.post("/", productsCategoryContoller.create);
router.get("/", productsCategoryContoller.getAll);
router.get("/:catId", productsCategoryContoller.getOne);
router.patch("/", productsCategoryContoller.update);
router.delete("/", productsCategoryContoller.deleteAll);
router.post("/catId", productsCategoryContoller.deleteOne);

module.exports = router;
