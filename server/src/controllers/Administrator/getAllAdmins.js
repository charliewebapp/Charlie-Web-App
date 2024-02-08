const { Administrator } = require("../../db");

const getAllAdmins = async () => {
  const allAdmins = await Administrator.findAll();
  console.log(allAdmins, "allAdmins");
  return allAdmins;
};

module.exports = getAllAdmins;
