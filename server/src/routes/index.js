const { Router } = require("express");
const postClientsHandler = require("../handlers/postClientsHandler");

const router = Router();

//products
// router.get("/product", getProductHandler);
// router.get("/product/:category", getProductCategoryHandler);
// router.post("/product", postProductHandler);
// router.put("/product", putProductHandler);
// router.delete("/product", deleteProductHandler);

router.post("/client", postClientsHandler); //pendiente cambiar esta ruta

//admins

module.exports = router;
