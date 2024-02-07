const { User } = require("../../db");

const postUser = async function (mail,password) {
  const newUser = await User.create(mail,password);
  return newUser;
};
module.exports = postUser;
