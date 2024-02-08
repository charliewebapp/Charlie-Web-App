const putAdmins = require("../../controllers/Administrator/putAdmins");

const putAdminsHandler = async (req, res) => {
  try {
    const { client, administrator } = req.params;
    const clientMinus = client.toLowerCase();
    const newData = req.body;
    const updateProduct = await putAdmins(
      clientMinus,
      administrator,
      newData
    );
    console.log(updateProduct);
    return res.status(201).json(updateProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = putAdminsHandler;
