const { Client } = require("../../db");

const getAllClients = async () => {
  const allClients = await Client.findAll();

  return allClients;
};

module.exports = getAllClients;
