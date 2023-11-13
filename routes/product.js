const expres = require("express");

const productController = require("../controllers/product");

const router = expres.Router();

//router to create a product
router.get("/orders/create", productController.createProduct);

//update the product
router.post("/orders/update", productController.updateProduct);

//list the products
router.get("/orders/list", productController.fetchProduct);

//fetch single product with orderId
router.post("/order/search", productController.findProduct);

//delete the product
router.delete("orders/delete/:order_id", productController.deleteProduct);

module.exports = router;
