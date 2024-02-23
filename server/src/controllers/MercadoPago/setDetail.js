const { Purchase, Client } = require("../../db");
const { Sequelize } = require('sequelize');
const setDetail = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const detailPurchase = await Purchase.findOne({
      where: {
        paymentId: paymentId,
      },
      include: [{
        model: Client,
        attributes: ['name'],
        as: 'client' // Utiliza el alias definido en la asociación
      }]
    });

    return res.status(201).json(detailPurchase);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = setDetail;