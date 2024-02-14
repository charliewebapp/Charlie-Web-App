const { Client, Collaborator } = require("../../db");
const { Op } = require("sequelize");

const getCollaborator = async (client) => {
  const clientSearched = await Client.findOne({ where: { name: client } });
  if (!clientSearched) throw new Error("El cliente no existe.");
  const clientId = clientSearched.dataValues.id;
  const collaboratorSearched = await Collaborator.findAll({
    where: { ClientId: clientId },
  });
  return collaboratorSearched;
};

module.exports = getCollaborator;
