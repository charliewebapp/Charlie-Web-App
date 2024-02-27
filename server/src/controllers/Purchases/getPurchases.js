const { Purchase } = require("../../db");

const getPurchases = async (req, res) => {
    try {
        const { clientId, userId } = req.params;
        const purchasesByClient = await Purchase.findAll({
            where: { UserId: userId, ClientId: clientId },
        });

        if (purchasesByClient.length === 0) {
            return res
                .status(404)
                .json({ error: "No hay compras para el cliente proporcionado." });
        }

        res.status(200).json(purchasesByClient);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = getPurchases;
