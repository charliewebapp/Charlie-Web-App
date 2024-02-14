const { User } = require("../../db");

const getUsers = async function () {
  const allUsers = await User.findAll();
  return allUsers;
};
module.exports = getUsers;
