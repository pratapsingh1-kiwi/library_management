const { signup, login, update, deleteo } = require("../services/user.service");
const { tokenHelper } = require("../helper/token.helper");
const student = require("../model/user.model");
const borrowerService = require("../services/borrow.service");

module.exports = {
  getProfile: async (req, res) => {
    const allPurchasedBooks = await borrowerService.findAllPurchasedBooks(req);
    res.send({ allPurchasedBooks });
  },
  signup: async (req, res) => {
    try {
      const result = await signup(req);
      console.log(result);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  },
  login: async (req, res) => {
    try {
      const result = await login(req);
      console.log(result);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  },
  update: async (req, res) => {
    try {
      const result = await update(req);
      console.log(result);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  },
  delete: async (req, res) => {
    try {
      const result = await deleteo(req);
      console.log(result);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  },
};
