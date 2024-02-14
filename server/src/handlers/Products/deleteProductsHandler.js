const deleteProducts = require("../../controllers/Products/deleteProducts");

const deleteProductHandler = async (req, res) => {
  try {
    const { client, id } = req.params;
    const clientMinus = client.toLowerCase();
    const deletedProduct = await deleteProducts(clientMinus, id);
    return res.status(201).json(deletedProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = deleteProductHandler;
