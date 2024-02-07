const deleteProducts = require('../../controllers/Products/deleteProducts');

const deleteProductHandler = async (req,res) => {
    try {
        const {client, product} = req.params
        const clientMinus = client.toLowerCase()
        const productMinus = product.toLowerCase()
        const deletedProduct =await deleteProducts(clientMinus,productMinus)
        return res.status(201).json(deletedProduct)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

module.exports = deleteProductHandler