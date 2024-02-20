const { Client, Administrator, Collaborator } = require("../../db");

const putClientsStatus = async function (client, newStatus) {
  try {
    console.log(client, "Este es client", newStatus, "este es el new status");
    const clientToChange = await Client.findOne({
      where: { name: client },
    });

    if (!clientToChange) {
      throw new Error(`El cliente ${client} no existe.`);
    }

    const clientWithId = clientToChange.id;
    await Client.update({ status: newStatus }, { where: { id: clientWithId } });
    // await Product.findAll({
    //   where: { ClientId: clientWithId },
    // });
    // await Product.update(
    //   { status: newStatus },
    //   { where: { ClientId: clientWithId } }
    // );

    await Administrator.findAll({
      where: { ClientId: clientWithId },
    });
    await Administrator.update(
      { status: newStatus },
      { where: { ClientId: clientWithId } }
    );

    await Collaborator.findAll({
      where: { ClientId: clientWithId },
    });

    await Collaborator.update(
      { status: newStatus },
      { where: { ClientId: clientWithId } }
    );

    return `Cliente ${client}, administradores y colaboradores relacionados han sido actualizados temporalmente.`;
  } catch (error) {
    throw error; // Propagar el error hacia arriba
  }
};
module.exports = putClientsStatus;
