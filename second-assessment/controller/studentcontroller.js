const { studentSignup, studentLogin, studentUpdate, array } = require('../service/studentserver');

const Signup = async (req, res) => {
  try {
   const result = await array(req);
    console.log(result)
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const login = async (req, res) => {
  try {
   const result = await studentLogin(req);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const Update = async (req, res) => {
  try {
   const result = await studentUpdate(req);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  Signup,
  login,
  Update,
};