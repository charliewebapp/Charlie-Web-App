const getAdminsClients = require("../../controllers/Administrator/getAdminsClients");

const getAdminsClientsHandler = async (req, res) => {
  try {
    const { client } = req.params;
    console.log(client);
    const getAdmins = await getAdminsClients(client);
    if (getAdmins.length === 0) {
      throw new Error("No hay administradores"); 
    }
    return res.status(201).json(getAdmins);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAdminsClientsHandler;
