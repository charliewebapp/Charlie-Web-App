const putQr = require('../../controllers/Qrs/putQr');

const updateQrStatus = async (req, res) => {
    try {
        const { uuid } = req.params;
        const newStatus = req.body;

        const response = await putQr(uuid, newStatus);

        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Error al actualizar el código QR' });
    }

}

module.exports = updateQrStatus