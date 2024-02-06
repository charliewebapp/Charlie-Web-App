const postClients = require("../controllers/postClients");

const postClientsHandler = async function (req, res) {
  try {
    const data = req.body;
    const response = await postClients(data);
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el cliente" });
  }
};

module.exports = postClientsHandler;
