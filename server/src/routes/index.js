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

// const getAllClientsHandler = require("../handlers/Clients/getAllClientsHandler");
// const deleteClientHandler = require("../handlers/Clients/deleteClientHandler");

const router = Router();
//--------------superadmin

//boliche
//! /////////////////////////////////////////////////
router.post("/client", upload.single("image"), postClientsHandler);
//   try {
//     const { name, adress, city } = req.body;
//     const imagePath = req.file ? saveImage(req.file) : null;

//     const newClient = await Client.create({
//       name,
//       image: imagePath,
//       adress,
//       city,
//       // Puedes agregar otros campos según sea necesario
//     });

//     res.status(201).json({ success: true, data: newClient });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ success: false, error: "Error al crear el cliente" });
//   }
// });

// function saveImage(file) {
//   const newPath = `./uploads/${file.originalname}`;
//   fs.renameSync(file.path, newPath);
//   return newPath; // Devuelve la ruta del archivo en lugar del objeto req.file
// }
//! /////////////////////////////////////////////////
router.get("/client", getAllClientsHandler); //pendiente cambiar esta ruta
router.delete("/:client", deleteClientHandler); //pendiente cambiar esta ruta
router.put("/:client", upload.single("image"), putClientsHandler); //pendiente cambiar esta ruta
//admins

router.get("/administrator", getAllAdminsHandler);
router.get("/:client/administrator", getAdminsClientsHandler);
router.post("/:client/administrator", postAdminsHandler);
router.put("/:client/:administrator", putAdminsHandler);
router.delete("/:client/:administrator", deleteAdminsHandler);

//-----------------cliente(boliche)
//products
router.get("/:client/product", getProductsHandler);
router.get("/:client/:category", getProductCategoryHandler);
router.post("/:client/product", postProductsHanlder);
router.put("/:client/product/:id", putProductHandler);
router.delete("/:client/product/:id", deleteProductHandler);
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

module.exports = router;
