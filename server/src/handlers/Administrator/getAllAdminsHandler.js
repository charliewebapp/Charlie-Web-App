const getAllAdmins = require("../../controllers/Administrator/getAllAdmins");
const getAllAdminsHandler = async (req, res) => {
  try {
    const getAdmins = await getAllAdmins();
    console.log(getAdmins, "getAdmins");
    if (getAdmins.length === 0) {
      throw new Error("No hay clientes");
    }
    return res.status(201).json(getAdmins);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAllAdminsHandler;
