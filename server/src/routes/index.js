const { Router } = require("express");
const postClientsHandler = require("../handlers/Clients/postClientsHandler");
const postProductsHanlder = require("../handlers/Products/postProductsHandler");
const getProductsHandler = require("../handlers/Products/getProductsHandler");

const router = Router();

//products
router.get("/:client/product", getProductsHandler);
// router.get("/product/:category", getProductCategoryHandler);
router.post("/:client/product", postProductsHanlder);
// router.put("/product", putProductHandler);
// router.delete("/product", deleteProductHandler);
// router.get("/category", getProductHandler);

router.post("/client", postClientsHandler); //pendiente cambiar esta ruta

//admins

module.exports = router;
