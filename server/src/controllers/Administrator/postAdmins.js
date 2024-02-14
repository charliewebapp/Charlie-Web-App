const { Administrator, Client } = require("../../db");

const postAdmins = async (
  nameMinus,
  password,
  mailMinus,
  status,
  clientMinus
) => {
  const clientSearched = await Client.findOne({ where: { name: clientMinus } });
  if (!clientSearched) throw new Error("El cliente no existe.");

  const clientId = clientSearched.dataValues.id;
  const adminExistence = await Administrator.findOne({
    where: { name_client: nameMinus, ClientId: clientId },
  });
  if (adminExistence) {
    return { error: "El Administrador ya existe" };
  }

  const newAdmin = await Administrator.create({
    name_client: nameMinus,
    password,
    mail: mailMinus,
    status,
    ClientId: clientId,
  });
  return newAdmin;
};
module.exports = postAdmins;
