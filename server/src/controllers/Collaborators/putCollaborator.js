const { Client, Collaborator } = require("../../db");

const putCollaborators = async (client, user, newData) => {
  console.log(client, user, newData);
  const clientSearched = await Client.findOne({ where: { name: client } });
  if (!clientSearched) throw new Error("El cliente no existe.");
  const clientId = clientSearched.dataValues.id;

  const updatedCollaborator = await Collaborator.findOne({
    where: {
      ClientId: clientId,
    },
  });

  await Collaborator.update(newData, {
    where: {
      ClientId: clientId,
    },
  });

  return updatedCollaborator;
};

module.exports = putCollaborators;
