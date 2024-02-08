const deleteQr = require('../../controllers/Qrs/deleteQr');

const deleteQrHandler = async (req, res) => {
    try {
        const { uuid } = req.params;

        const response = await deleteQr(uuid);

        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}
module.exports = deleteQrHandler