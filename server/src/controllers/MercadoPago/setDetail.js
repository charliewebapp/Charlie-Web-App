const { Purchase } = require("../../db");

const setDetail = async (req, res) => {
  try {
    const {id} = req.params;

    const detailPurchase = await Purchase.findOne({
      where: {
        id: id,
      },
    });
    return res.status(201).json(detailPurchase);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = setDetail;
