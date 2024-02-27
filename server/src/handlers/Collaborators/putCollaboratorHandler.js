const putCollaborators = require("../../controllers/Collaborators/putCollaborator");

const putCollaboratorsHandler = async (req, res) => {
  try {
    const { client, user } = req.params;
    console.log(client, user, "client and user");
    const clientMinus = client.toLowerCase();
    const newData = req.body;
    console.log(newData, "newData");

    const updateCollaborator = await putCollaborators(
      clientMinus,
      user,
      newData
    );
    return res.status(201).json(updateCollaborator);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = putCollaboratorsHandler;
