const { Client } = require("../../db");

const postClients = async function (data) {
  const newClient = await Client.create(data);
  return newClient;
};
module.exports = postClients;
