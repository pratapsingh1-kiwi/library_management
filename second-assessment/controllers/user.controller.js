const { signup,login,update} = require("../services/user.service");
const { tokenHelper } = require("../helper/token.helper")
const student = require("../model/user.model")

module.exports = {
  getProfile: async (req, res, next) => {
    const userId = req.userId;
    const allPurchasedBooks = await borrowerService.findAllPurchasedBooks(
      userId,
      next
    );
    res.send({ books: allPurchasedBooks });
  },
  signup: async (req, res) => {
    try {
     const result = await signup(req);
      console.log(result)
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  },
  login: async (req, res) => {
    try {
     const result = await login(req);
      console.log(result)
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  },
  update: async (req, res) => {
    try {
     const result = await update(req);
      console.log(result)
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  },
  delete: async (req, res) => {
    try {
     const result = await delete(req);
      console.log(result)
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  },

};
