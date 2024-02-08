const postQr = require('../../controllers/Qrs/postQr');

const postQrHandler = async (req, res) => {
    try {
        const { products, totalPrice, status } = req.body;

        const response = await postQr(products, totalPrice, status);

        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Error al crear el código QR' });
    }

}

module.exports = postQrHandler