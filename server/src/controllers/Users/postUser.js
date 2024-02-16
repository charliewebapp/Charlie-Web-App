  const { User } = require("../../db");

  const postUser = async function (data) {
    const [user] = await User.findOrCreate({
      where: {
        id: data.id,
      },
      defaults: data, 
    });
  
    return user; 
  };
  module.exports = postUser;
