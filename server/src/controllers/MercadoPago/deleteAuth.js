const { Client, Authorizations } = require("../../db");

const deleteAuth = async (req, res) => {
  try {
    const { clubName } = req.body;
    
    console.log(clubName);
    const client = await Client.findOne({
      where: {
        name: clubName,
      },
    });

    const clientId = client.dataValues.id;

    
    const deletedAuth = await Authorizations.findOne({
      where: {
        ClientId: clientId,
      }
    })
    
    
    const deleteAuth = await Authorizations.destroy({
      where: {
        ClientId: clientId,
      },
    });

    return res.status(201).json(deletedAuth);
  } catch (error) {
    return res.status(201).json({ error: error.message });
  }
};

module.exports = deleteAuth;
