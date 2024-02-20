const putClientsStatus = require("../../controllers/Clients/putClientsStatus");

const putClientStatusHandler = async (req, res) => {
  try {
    const { client } = req.params;
    const newState = req.body.status;

    const updateStatus = await putClientsStatus(client, newState);
    return res.status(201).json(updateStatus);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = putClientStatusHandler;
