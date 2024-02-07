const postProducts = require("../../controllers/Products/postProducts");

const postProductsHanlder = async (req, res) => {
  try {
    const data = req.body
    const newProduct = await postProducts(data)
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};


module.exports = postProductsHanlder