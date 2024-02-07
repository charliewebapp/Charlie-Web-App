const getProductCategory = require('../../controllers/Products/getProductsCategory')

const getProductCategoryHandler = async (req,res) => {
    try {
        const {client, category} = req.params
        const categoryMayus = category.charAt(0).toUpperCase() + category.slice(1);
        const clientMayus = client.toLowerCase()
        const filterProductCategory = await getProductCategory(clientMayus, categoryMayus)
        if(filterProductCategory.length < 1) return res.status(400).json({error: 'No existen productos en esta categoria'})
        return res.status(201).json(filterProductCategory)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}
module.exports = getProductCategoryHandler