const postClients = require("../../controllers/Clients/postClients");
const cloudinary = require("cloudinary").v2;
// const fs = require("node:fs");

// function saveImage(file) {
//   const newPath = `./uploads/${file.originalname}`;
//   fs.renameSync(file.path, newPath);
//   return newPath; // Devuelve la ruta del archivo en lugar del objeto req.file
// }

const postClientsHandler = async function (req, res) {
  try {
    if (!req.file) { const { name, adress, city } = req.body;
    console.log(name, adress, city, "Estos son los datos");
    const nameMinus = name.toLowerCase();
    const response = await postClients(nameMinus, adress, city);
    res.status(201).json(response);
  
      
    } 
    const image = await cloudinary.uploader.upload(req.file.path);
    const imageUrl = image.url;
    const { name, adress, city } = req.body;
    console.log(name, adress, city, "Estos son los datos");
    const nameMinus = name.toLowerCase();
    const response = await postClients(nameMinus, adress, city, imageUrl);
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Error al crear el cliente" });
  }
};

module.exports = postClientsHandler;

// try {
//   const { name, adress, city } = req.body;
//   const imagePath = req.file ? saveImage(req.file) : null;

//   const newClient = await Client.create({
//     name,
//     image: imagePath,
//     adress,
//     city,
//     // Puedes agregar otros campos según sea necesario
//   });

//   res.status(201).json({ success: true, data: newClient });
// } catch (error) {
//   console.error(error);
//   res
//     .status(500)
//     .json({ success: false, error: "Error al crear el cliente" });
// }
// });

// function saveImage(file) {
// const newPath = `./uploads/${file.originalname}`;
// fs.renameSync(file.path, newPath);
// return newPath; // Devuelve la ruta del archivo en lugar del objeto req.file
// }
