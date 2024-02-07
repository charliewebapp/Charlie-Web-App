const { Router } = require("express");
const postClientsHandler = require("../handlers/Clients/postClientsHandler");
const postProductsHanlder = require("../handlers/Products/postProductsHandler");
const getProductsHandler = require("../handlers/Products/getProductsHandler");
const getProductCategoryHandler = require("../handlers/Products/getProductsCategoryHandler");
const deleteProductHandler = require("../handlers/Products/deleteProductsHandler");
const putProductHandler = require("../handlers/Products/putProductHandler");


const router = Router();
//--------------superadmin
//boliche
router.post("/client", postClientsHandler); //pendiente cambiar esta ruta
//admins

//-----------------cliente(boliche)
//products
router.get("/:client/product", getProductsHandler);
router.get("/:client/:category", getProductCategoryHandler);
router.post("/:client/product", postProductsHanlder);
router.put("/:client/:product", putProductHandler);
router.delete("/:client/:product", deleteProductHandler);
//colaborador

//--------------colaborador

//--------------consumidor

module.exports = router