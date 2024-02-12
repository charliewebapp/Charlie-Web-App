const { Administrator } = require("../../db");

const deleteAdmins = async (administrator) => {
 
  const clientSearched = await Administrator.findOne({ where: { id: administrator } });
  if (!clientSearched) throw new Error("El administrador no existe.");
  

  const deleteAdm = await Administrator.destroy({
    where: { id: administrator },
  });
  return deleteAdm;
};

module.exports = deleteAdmins;