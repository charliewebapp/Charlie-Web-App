const { Client, Collaborator } = require("../../db");

const putCollaborators = async (client, user, newData) => {
  const clientSearched = await Client.findOne({ where: { name: client } });
  if (!clientSearched) throw new Error("El cliente no existe.");
  const clientId = clientSearched.dataValues.id;
  const updatedCollaborator = await Collaborator.findOne({
    where: {
      ClientId: clientId,
    },
  });

  const updatededCollaborator = await Collaborator.update(newData, {
    where: {
      id: user,
    },
  });

  return updatededCollaborator;
};

module.exports = putCollaborators;
