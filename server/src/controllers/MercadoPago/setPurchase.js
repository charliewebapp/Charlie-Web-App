const { Client, User, QRCode, Purchase } = require("../../db");

const setPurchase = async (req, res) => {
  try {
    const { amount, paymentId, clubName, cart , userId } = req.body;

    const client = await Client.findOne({
      where: {
        name: clubName,
      },
    });

    const clientId = client.dataValues.id;

    const paymentExists = await Purchase.findOne({
      where: {
        paymentId: paymentId,
      },
    });

    if (paymentExists) {
      console.log('paymentExists: ',paymentExists.dataValues);
      return res.status(201).json(paymentExists);
    } else {
      const newPurchase = await Purchase.create({
        amount: amount,
        paymentId: paymentId,
        cart: cart,
        ClientId: clientId,
        UserId: userId
      });
      console.log('newPurchase: ',newPurchase.dataValues);
      return res.status(201).json(newPurchase);
    }

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = setPurchase;
