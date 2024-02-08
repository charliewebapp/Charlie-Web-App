const { User } = require("../../db");

const postUser = async function (data) {
  const newUser = await User.create(data);
  return newUser;
};
module.exports = postUser;
