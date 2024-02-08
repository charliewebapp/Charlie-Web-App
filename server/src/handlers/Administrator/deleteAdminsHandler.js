const deleteAdmins = require("../../controllers/Collaborators/deleteCollaborator");

const deleteAdminsHandler = async (req, res) => {
  try {
    const { client, administrator } = req.params;
    const clientMinus = client.toLowerCase();
    const deletedController = await deleteAdmins(clientMinus,administrator);
    return res.status(201).json(deletedController);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = deleteAdminsHandler;
