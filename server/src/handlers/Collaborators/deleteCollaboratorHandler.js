const deleteCollaborator = require("../../controllers/Collaborators/deleteCollaborator");

const deleteControllerHandler = async (req, res) => {
  try {
    const { client, user } = req.params;
    console.log(client, user);
    const userMinus = user.toLowerCase();
    const deletedController = await deleteCollaborator(client, userMinus);
    return res.status(201).json(deletedController);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = deleteControllerHandler;
