const postCollaborator = require("../../controllers/Collaborators/postCollaborator");

const postCollaboratorHandler = async (req, res) => {
  try {
    const { name, lastname, password, mail } = req.body;
    const nameMinus = name.toLowerCase();
    const lastnameMinus = lastname.toLowerCase();
    const mailMinus = mail.toLowerCase();
    const { client } = req.params;
    const clientMinus = client.toLowerCase();
    const newCollaborator = await postCollaborator(
      nameMinus,
      lastnameMinus,
      password,
      mailMinus,
      clientMinus
    );
    return res.status(201).json(newCollaborator);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postCollaboratorHandler;
