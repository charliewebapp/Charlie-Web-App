const getCollaboratorName = require("../../controllers/Collaborators/getCollaboratorName");

const getCollaboratorNameHandler = async (req, res) => {
  try {
    const { client, user } = req.params;
    console.log(client, user);
    const clientMinus = client.toLowerCase();
    const userMinus = user.toLowerCase();
    const collaboratorSearched = await getCollaboratorName(clientMinus, userMinus);
    return res.status(201).json(collaboratorSearched);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getCollaboratorNameHandler;
