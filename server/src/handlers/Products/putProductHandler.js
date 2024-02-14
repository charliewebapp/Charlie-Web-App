const putProducts = require("../../controllers/Products/putProducts");

const putProductHandler = async (req, res) => {
  try {
    const { client, id } = req.params;
    const clientMinus = client.toLowerCase()
    // const productMinus = product.toLowerCase()
    const newData = req.body;
    const updateProduct = await putProducts(clientMinus, id, newData);
    return res.status(201).json(updateProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = putProductHandler;
