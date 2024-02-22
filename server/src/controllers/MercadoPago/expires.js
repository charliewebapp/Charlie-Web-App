const { Client, Authorizations } = require("../../db");

const expires = async (req, res) => {
  try {
    const { clubName } = req.body;
    const client = await Client.findOne({
      where: {
        name: clubName,
      },
    });
    const clientId = client.dataValues.id;

    const Auth = await Authorizations.findOne({
      where: {
        ClientId: clientId,
      },
    });
    const date = Auth.dataValues.expires_in;
    return res.status(201).json(date);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = expires;
