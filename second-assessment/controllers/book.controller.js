const { bookService, borrowerService, returnService } = require("../services");
module.exports = {
  displayBooks: async (req, res, next) => {
    const books = await bookService.getAllBooks(next);
    res.send({ books });
  },

  addBook: async (req, res) => {
    try {
      const result = await bookService.addBook(req);
      console.log(result);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  },

  borrowBook: async (req, res) => {
    try {
      const result = await borrowerService.borrowBook(req);
      console.log(result);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  },
  returnBook: async (req, res) => {
    try {
      const result = await returnService.returnBook(req);
      console.log(result);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  },
  singleBook: async (req, res) => {
    try {
      const result = await borrowerService.singleBook(req);
      console.log(result);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  },
  allBooks: async (req, res) => {
    try {
      const result = await borrowerService.allBooks(req);
      console.log(result);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  },

  daysleft: async (req, res) => {
    try {
      const result = await borrowerService.daysleft(req);
      res.send(result);
    } catch (e){
      res.send(e);
    }
  }
};
