const getProducts = require('../../controllers/Products/getProducts')

const getProductsHandler = async (req, res) => {
try {
    const allProducts = await getProducts();
    return res.status(201).json(allProducts)
} catch (error) {
    return res.status(500).json({error:error.message})
}
}

module.exports = getProductsHandler