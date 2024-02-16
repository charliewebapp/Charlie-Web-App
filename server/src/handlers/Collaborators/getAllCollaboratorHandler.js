const getAllColaborators = require("../../controllers/Collaborators/getAllCollaborators");

const getAllCollaboratorHandler = async (req, res) => {
  try {
    const allCollaboratorSearched = await getAllColaborators();
    return res.status(201).json(allCollaboratorSearched);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAllCollaboratorHandler;
