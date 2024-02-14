const putClients = require("../../controllers/Clients/putClients");
const fs = require("node:fs");

function saveImage(file) {
  const newPath = `./uploads/${file.originalname}`;
  fs.renameSync(file.path, newPath);
  return newPath; // Devuelve la ruta del archivo en lugar del objeto req.file
}

const putClientsHandler = async (req, res) => {
  try {
    const { client } = req.params;
    const imagePath = req.file ? saveImage(req.file) : null;
    const clientMinus = client.toLowerCase();
    const newData = req.body;
    console.log(imagePath);
    const { name } = req.body;
    if (name) {
      const nameMinus = name.toLowerCase();
      const data = { ...newData, name: nameMinus };
      if (imagePath) {
        const data = { ...newData, image: imagePath };
        const updateClient = await putClients(clientMinus, data);
        return res.status(201).json(updateClient);
      }
      const updateClient = await putClients(clientMinus, data);
      return res.status(201).json(updateClient);
    } else {
      if (imagePath) {
        const data = { ...newData, image: imagePath };
        const updateClient = await putClients(clientMinus, data);
        return res.status(201).json(updateClient);
      }
      const updateClient = await putClients(clientMinus, newData);
      return res.status(201).json(updateClient);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = putClientsHandler;
