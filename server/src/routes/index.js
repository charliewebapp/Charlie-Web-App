const { Router } = require("express");

const router = Router();

//products
router.get("/product", getProductHandler);
router.get("/product/:category", getProductCategoryHandler);
router.post("/product", postProductHandler);
router.put("/product", putProductHandler);
router.delete("/product", deleteProductHandler);

//categories

//clients
router.post("/client", postClientHandler);

//admins

module.exports = router;
