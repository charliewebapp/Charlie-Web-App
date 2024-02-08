const deleteAllClients = require("../../controllers/Clients/deleteAllClients");

const deleteClientHandler = async (req, res) => {
  try {
    const clientName = req.params.client;

    const response = await deleteAllClients(clientName);

    if (response === 0) {
      throw new Error(
        `El cliente '${clientName}' no existe o ya fue eliminado.`
      );
    }

    return res
      .status(200)
      .json({ message: `Cliente '${clientName}' eliminado correctamente` });
  } catch (error) {
    return res.status(404).json({ error: error.message }); // Cambié el código de estado a 404
  }
};

module.exports = deleteClientHandler;
