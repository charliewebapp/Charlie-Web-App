const postProducts = require("../../controllers/Products/postProducts");

const postProductsHanlder = async (req, res) => {
  try {
    const data = req.body;
    const { client } = req.params;
    const clientMinus = client.toLowerCase()
    const name = data.name
    const nameMinus = name.toLowerCase()
    const newData = {...data, name: nameMinus}
    if (!clientMinus) return res.status(400).json({ error: error.message });

    const newProduct = await postProducts(newData, clientMinus);
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postProductsHanlder;
