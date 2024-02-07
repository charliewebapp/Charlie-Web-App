const getProducts = require('../../controllers/Products/getProducts')

const getProductsHandler = async (req, res) => {
try {
    const allProductos = await getProducts();
    console.log(allProductos);
    return res.status(201).json(allProductos)
} catch (error) {
    return res.status(500).json({error:error.message})
}
}

module.exports = getProductsHandler