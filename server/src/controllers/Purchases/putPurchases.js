const { Purchase } = require("../../db");

const putPurchases = async (req, res) => {
    try {
        const { status } = req.body;
        const { PurchaseId } = req.params;
        const { clientId } = req.params;
        console.log("status: ",status,"PurchaseID: ",PurchaseId,"ClientId: ",clientId)

        const purchaseToUpdate = await Purchase.findOne({
            where: {
                id: PurchaseId,
                ClientId: clientId,
            },
        });
console.log("purchase to update", purchaseToUpdate  )
        if (!purchaseToUpdate) {
            return res.status(404).json({ error: "Compra no encontrada" });
        }
        if (purchaseToUpdate.dataValues.status === "pending"){
        const updatedPurchase = await Purchase.update({ status: status } , {
            where: {
                id: PurchaseId,
            },
        });

        return res.status(201).json(updatedPurchase);}
        else return res.status(500).json({error:"La compra que intenta modificar fue procesada anteriormente!"})
    } catch (error) {
        console.error("Error al modificar estado de compra:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = putPurchases;
