const postQr = require('../../controllers/Qrs/postQr');

const postQrHandler = async (req, res) => {
    try {
        const { products, totalPrice, status, ClientId, UserId } = req.body;
        const { idMP } = req.params;

        const response = await postQr(products, totalPrice, status, idMP, ClientId, UserId);

        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}

module.exports = postQrHandler