const { Client, Authorizations } = require("../../db");

const apiKey = async (req, res) => {
  const clubName = req.body.clubName;


  const client = await Client.findOne({ where: { name: clubName } });

  const clientId = client.dataValues.id;

  const auth = await Authorizations.findOne({ where: { ClientId: clientId } });

  const key = auth.dataValues.public_key


  return res.status(201).json(key);
};

module.exports = apiKey;