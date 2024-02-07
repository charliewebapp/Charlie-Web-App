const postProducts = require("../../controllers/Products/postProducts");

const postProductsHanlder = async (req, res) => {
  try {
    const data = req.body
    const {client} = req.params 

    if (!client) return res.status(400).json({ error: error.message });
    
    const newProduct = await postProducts(data, client)
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


module.exports = postProductsHanlder

