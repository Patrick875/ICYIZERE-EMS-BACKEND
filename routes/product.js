const productsController = require("../controllers/productController");
const express = require("express");

const router = express.Router();

router.post("/", productsController.create);
router.get("/", productsController.getAll);
router.patch("/", productsController.update);
router.delete("/", productsController.deleteAll);
router.post("/prodId", productsController.deleteOne);

module.exports = router;
