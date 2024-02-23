const { Client, Purchase } = require("../../db");

const purchaseByClient = async (req, res) => {
  try {
    
    const { ClientId } = req.body; 
   
    const validClient = await Client.findOne({
      where: {
        id: ClientId,
      },
    })

    if (!validClient) return res.status(400).json({ error: "Error en información suministrada" });
   
    const QrCodesByClient = await Purchase.findAll({
      where: {
        ClientId: ClientId
      },
    });

    return res.status(201).json(QrCodesByClient);
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = purchaseByClient;