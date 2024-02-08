const { Router } = require("express");
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


// const getAllClientsHandler = require("../handlers/Clients/getAllClientsHandler");
// const deleteClientHandler = require("../handlers/Clients/deleteClientHandler");

const router = Router();
//--------------superadmin


//boliche
router.post("/client", postClientsHandler); //pendiente cambiar esta ruta
// router.get("/client", getAllClientsHandler); //pendiente cambiar esta ruta
// router.delete("/:client", deleteClientHandler); //pendiente cambiar esta ruta
// router.put("/:client", putProductHandler); //pendiente cambiar esta ruta
//admins

//-----------------cliente(boliche)
//products
router.get("/:client/product", getProductsHandler);
router.get("/:client/:category", getProductCategoryHandler);
router.post("/:client/product", postProductsHanlder);
router.put("/:client/:product", putProductHandler);
router.delete("/:client/:product", deleteProductHandler);
router.post("/user", postUserHandler);
router.get("/user", getUsersHandler);
//colaborador
router.get("/:client/collaborator/users", getCollaboratorHandler);
router.get("/:client/collaborator/:user", getCollaboratorNameHandler);
router.post("/:client/collaborator", postCollaboratorHandler);
router.put("/:client/collaborator/:user", putCollaboratorsHandler);
router.delete("/:client/collaborator/:user", deleteControllerHandler);

//--------------colaborador

//--------------consumidor

module.exports = router

prueba