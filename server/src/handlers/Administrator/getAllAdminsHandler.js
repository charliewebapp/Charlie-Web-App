const getAllAdmins = require("../../controllers/Administrator/getAllAdmins");
const getAllAdminsHandler = async (req, res) => {
  try {
    const getAdmins = await getAllAdmins();
    if (getAdmins.length === 0) {
      throw new Error("No hay administradores");
    }
    return res.status(201).json(getAdmins);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAllAdminsHandler;
