const { Client, Purchase } = require("../../db");

const postPurchases = async (req, res) => {
  try {
    const { clubName, userId } = req.body;
    const clientIdHarc = "87d03f75-42d5-4279-8228-926f6f79c8c5";
    const client = await Client.findOne({
      where: {
        name: clubName,
      },
    });
    const clientId = client.dataValues.id;
    const purchase = await Purchase.findAll({
      where: {
        ClientId: clientIdHarc,
        UserId: userId,
      },
    });
    const purchaseFinal = purchase.map((purchase) => purchase.dataValues);

    return res.status(201).json(purchaseFinal);
  } catch (error) {}
};

module.exports = postPurchases;
