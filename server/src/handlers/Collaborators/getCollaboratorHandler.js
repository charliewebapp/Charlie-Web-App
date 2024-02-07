const getCollaborator = require("../../controllers/Collaborators/getCollaborator");

const getCollaboratorHandler = async (req, res) => {
  try {
    const { client } = req.params;
    const clientMinus = client.toLowerCase();
    const collaboratorSearched = await getCollaborator(clientMinus);
    return res.status(201).json(collaboratorSearched);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getCollaboratorHandler;
