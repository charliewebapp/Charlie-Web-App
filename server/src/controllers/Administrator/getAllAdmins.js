const { Administrator } = require("../../db");

const getAllAdmins = async () => {
  const allAdmins = await Administrator.findAll();
  return allAdmins;
};

module.exports = getAllAdmins;
