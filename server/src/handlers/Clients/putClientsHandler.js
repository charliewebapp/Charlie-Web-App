const putClients = require("../Clients/putClients");

const putClientsHandler = async (req, res) => {
  const clientId = req.params.clientId;
  const updatedData = req.body;

  try {
    const updatedClient = await putClients(clientId, updatedData);
    res.json(updatedClient);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = putClientsHandler;
