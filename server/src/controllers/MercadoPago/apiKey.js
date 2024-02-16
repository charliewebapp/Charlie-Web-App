const { Client, Authorizations } = require("../../db");

const apiKey = async (req, res) => {
  const urlRecibida = req.body.cliente;

  console.log('apikey', urlRecibida);

  const client = await Client.findOne({ where: { name: urlRecibida } });

  const clientId = client.dataValues.id;

  const auth = await Authorizations.findOne({ where: { ClientId: clientId } });

  // console.log(auth.dataValues.public_key);
  const key = auth.dataValues.public_key

  console.log('apikey', key);

  return res.status(201).json(key);
};

module.exports = apiKey;