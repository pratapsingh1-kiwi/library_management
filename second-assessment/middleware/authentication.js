const bcryptjs = require('bcryptjs');

const passwordgeneration = async (Password) => {
  const salt = await bcryptjs.genSalt(10);
  const securePassword = await bcryptjs.hash(userPassword, salt);
  return securePassword;
};

const comparePassword = async (Password, bcryptPassword) => {
  const result = await bcryptjs.compare(Password, bcryptPassword);
  if (!result) {
    return "wrong password";
  }
  return "logged in";
};
module.exports = {
  passwordgeneration,
  comparePassword,
};