const { Collaborator } = require("../../db");

const getAllCollaborator = async () => {
  const collaborators = await Collaborator.findAll();
  console.log(collaborators, "collaborators");
  return collaborators;
};

module.exports = getAllCollaborator;
