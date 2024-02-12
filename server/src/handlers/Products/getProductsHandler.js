const getProducts = require("../../controllers/Products/getProducts");

const getProductsHandler = async (req, res) => {
  try {
    const { client } = req.params;
    const clientMayus = client.toLowerCase();
    const allProducts = await getProducts(clientMayus);
    // if(allProducts.length < 1) return res.status(400).json({error: 'No existen productos'})
    return res.status(201).json(allProducts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getProductsHandler;
