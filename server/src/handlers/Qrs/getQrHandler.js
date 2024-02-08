const getQr = require('../../controllers/Qrs/getQr');

const getQrHandler = async (req, res) => {
    try {
        const { uuid } = req.params;

        const response = await getQr(uuid);

        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
module.exports = getQrHandler