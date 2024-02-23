const { Purchase } = require("../../db");

const setDetail = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const detailPurchase = await Purchase.findOne({
      where: {
        paymentId: paymentId,
      },
    });
    return res.status(201).json(detailPurchase);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = setDetail;
