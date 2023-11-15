const express = require("express");

const productController = require("../controllers/product");

const router = express.Router();

//router to create a product
router.post("/orders/create", productController.createProduct);

//update the product
router.post("/orders/update", productController.updateProduct);

//list the products
router.get("/orders/list/", productController.fetchProducts);

//fetch single product with orderId
router.post("/orders/search", productController.getProduct);

//delete the product
router.delete("/orders/delete/:order_id", productController.deleteProduct);

module.exports = router;
