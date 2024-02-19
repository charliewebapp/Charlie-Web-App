const putCollaborators = require("../../controllers/Collaborators/putCollaborator");

const putCollaboratorsHandler = async (req, res) => {
  try {
    const { client, user } = req.params;
    const clientMinus = client.toLowerCase()
    const newData = req.body
    console.log(newData, 'newData')

    const updateProduct = await putCollaborators(clientMinus, user, newData);
    return res.status(201).json(updateProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = putCollaboratorsHandler;
