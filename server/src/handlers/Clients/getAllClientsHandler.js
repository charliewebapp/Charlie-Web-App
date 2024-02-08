const getAllClients = require("../../controllers/Clients/getAllClients");

const getAllClientsHandler = async (req, res) => {
  try {
    const getClients = await getAllClients();
    if (getClients.length === 0) {
      throw new Error("No hay clientes");
    }
    return res.status(201).json(getClients);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAllClientsHandler;
