const { Client, Collaborator } = require("../../db");
const { Op } = require("sequelize");

const getCollaboratorName = async (client, user) => {
    console.log(user);
  const clientSearched = await Client.findOne({ where: { name: client } });
  if (!clientSearched) throw new Error("El cliente no existe.");
  const clientId = clientSearched.dataValues.id;
  const collaboratorSearched = await Collaborator.findOne({
    where: {
        [Op.or]: [
          { name: user },
          { lastname: user }
        ],
        ClientId: clientId
      }
  });
  return collaboratorSearched;
};

module.exports = getCollaboratorName;
