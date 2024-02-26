const { Router } = require("express");

//! /////////////////////////////////////////////////
const multer = require("multer");
const upload = multer({ dest: "uploads" });

//! /////////////////////////////////////////////////
const postClientsHandler = require("../handlers/Clients/postClientsHandler");
const postProductsHanlder = require("../handlers/Products/postProductsHandler");
const getProductsHandler = require("../handlers/Products/getProductsHandler");
const getProductCategoryHandler = require("../handlers/Products/getProductsCategoryHandler");
const deleteProductHandler = require("../handlers/Products/deleteProductsHandler");
const putProductHandler = require("../handlers/Products/putProductHandler");
const postUserHandler = require("../handlers/Users/postUserHandler");
const getUsersHandler = require("../handlers/Users/getUsersHandler");

const postCollaboratorHandler = require("../handlers/Collaborators/postCollaboratoHandler");
const getCollaboratorHandler = require("../handlers/Collaborators/getCollaboratorHandler");
const deleteControllerHandler = require("../handlers/Collaborators/deleteCollaboratorHandler");
const getCollaboratorNameHandler = require("../handlers/Collaborators/getCollaboratorNameHandler");
const putCollaboratorsHandler = require("../handlers/Collaborators/putCollaboratorHandler");
const deleteClientHandler = require("../handlers/Clients/deleteClientHandler");
const postAdminsHandler = require("../handlers/Administrator/postAdminsHandler");
const getAllAdminsHandler = require("../handlers/Administrator/getAllAdminsHandler");
const putAdminsHandler = require("../handlers/Administrator/putAdminsHandler");
const getAllClients = require("../controllers/Clients/getAllClients");
const getAllClientsHandler = require("../handlers/Clients/getAllClientsHandler");
const deleteAdminsHandler = require("../handlers/Administrator/deleteAdminsHandler");
const getAdminsClientsHandler = require("../handlers/Administrator/getAdminsClientsHandler");
const putClientsHandler = require("../handlers/Clients/putClientsHandler");
const purchaseByUser = require("../controllers/Users/purchaseByUser");
const purchaseByClient = require("../controllers/Clients/purchasesByClient");


const AuthMercadoPago = require("../controllers/MercadoPago/AuthMercadoPago");
const apiKey = require("../controllers/MercadoPago/apiKey");
const PreferenceId = require("../controllers/MercadoPago/PreferenceId");
const webhook = require("../controllers/MercadoPago/webhook");
const getAllCollaboratorHandler = require("../handlers/Collaborators/getAllCollaboratorHandler");
const setPurchase = require("../controllers/MercadoPago/setPurchase");
const postPurchases = require("../controllers/Purchases/postPurchases");
const setDetail = require("../controllers/MercadoPago/setDetail");
const putClientStatusHandler = require("../handlers/Clients/putClientStatusHandler");
const refreshToken = require("../controllers/MercadoPago/refreshToken");
const setRefund = require("../controllers/MercadoPago/setRefund");
const expires = require("../controllers/MercadoPago/expires");
const paymentAutorizations = require("../handlers/Controls/paymentAutorizations")

const putPurchases = require("../controllers/Purchases/putPurchases");
const deleteAuth = require("../controllers/MercadoPago/deleteAuth");
const getAuth = require("../controllers/MercadoPago/getAuth");

const router = Router();

//mercado-pago
router.get ("/validations/:client", paymentAutorizations)
router.post("/mercadopago-authorization/success", AuthMercadoPago);
router.post("/search-apiKey", apiKey);
router.post("/create_preference", PreferenceId);
router.post("/paymentsuccess", webhook);
router.post("/setPurchase", setPurchase);
router.get("/detailPurchase/:paymentId", setDetail);
router.post("/refresh-token", refreshToken);
router.post("/refundPurchase", setRefund);
router.post("/set-date-expire", expires);
router.delete("/deleteAuth", deleteAuth);
router.post('/getAuth', getAuth)

// //history

router.post("/:client/searchHistory", postPurchases);

//boliche
//! /////////////////////////////////////////////////
router.post("/client", upload.single("image"), postClientsHandler);

//! /////////////////////////////////////////////////
router.get("/client", getAllClientsHandler); //pendiente cambiar esta ruta
router.delete("/:client", deleteClientHandler); //pendiente cambiar esta ruta
router.put("/:client", upload.single("image"), putClientsHandler); //pendiente cambiar esta ruta
router.put("/:client/status", putClientStatusHandler);

//admins

router.get("/administrator", getAllAdminsHandler);
router.get("/:client/administrator", getAdminsClientsHandler);
router.post("/:client/administrator", postAdminsHandler);
router.put("/:client/:administrator", putAdminsHandler);
router.delete("/:client/:administratorId", deleteAdminsHandler);

//-----------------cliente(boliche)
//products
router.get("/:client/product", getProductsHandler);
router.get("/:client/:category", getProductCategoryHandler);
router.post("/:client/product", postProductsHanlder);
router.put("/:client/product/:id", putProductHandler);
router.delete("/:client/product/:id", deleteProductHandler);
router.post("/user", postUserHandler);
router.get("/user", getUsersHandler);
router.get("/purchasebyuser", purchaseByUser);
router.get("/:client/purchasebyclient/:ClientId", purchaseByClient);
//colaborador
router.get("/:client/collaborator/users", getCollaboratorHandler);
router.get("/:client/collaborator/:user", getCollaboratorNameHandler);
router.post("/:client/collaborator", postCollaboratorHandler);
router.put("/:client/collaborator/:user", putCollaboratorsHandler);
router.delete("/:client/collaborator/:user", deleteControllerHandler);
router.get("/collaborator", getAllCollaboratorHandler);

//--------------colaborador

router.put("/:client/purchase/status/:PurchaseId", putPurchases);

//--------------consumidor

module.exports = router;
