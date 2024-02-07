const { Collaborator, Client } = require("../../db");

const postCollaborator = async (
  nameMinus,
  lastnameMinus,
  password,
  mailMinus,
  client
) => {
  const clientSearched = await Client.findOne({ where: { name: client } });
  if (!clientSearched) throw new Error("El cliente no existe.");
  const clientId = clientSearched.dataValues.id;

  const collaboratorExistence = await Collaborator.findOne({
    where: { name:nameMinus, ClientId: clientId },
  });

  if (collaboratorExistence) return { error: "El colaborador ya existe" };

  const newCollaborator = await Collaborator.create({
    name: nameMinus,
    lastname: lastnameMinus,
    password: password,
    mail: mailMinus,
    ClientId: clientId,
  });
  return newCollaborator;
};

module.exports = postCollaborator;
