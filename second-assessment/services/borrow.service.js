const { borrowerModel } = require("../model/borrower.model");
const PER_PAGE = 5;
module.exports = {
  borrowBook: async (req) => {
    try {
      const bookId = req.body.bookId;
      const alreadyPurchased = await borrowerModel.findOne({ bookId });
      if (alreadyPurchased) {
        // then show error
        return res.send("User has already purchased this book");
      } else {
        const doc = new borrowerModel({
          email: req.body.email,
          userId: req.body.userId,
          bookId: req.body.bookId,
          purchaseDate: req.body.purchaseDate,
        });
        const obj = await doc.save();
        return obj;
      }
    } catch (e) {
      return e;
    }
  },
  findPurchaseBookById: async (req) => {
    try {
      const obj = await borrowerModel.findOne({ bookId: req.body.bookId });
      return obj;
    } catch (e) {
      console.log(e.toString());
      next(e);
    }
  },
  findAllPurchasedBooks: async (req) => {
    try {
      var page = req.body.page;
      const obj = await borrowerModel.find()
      .skip(PER_PAGE * page - PER_PAGE)
      .limit(PER_PAGE);
      return obj;
    } catch (e) {
      return e;
    }
  },
  updateBorrowerBook: async (req) => {
    try {
      const obj = await borrowerModel.findOneAndUpdate(
        { bookId: req.body.bookId },
        {
          $set: {
            email: req.body.email,
            userId: req.body.userId,
            bookId: req.body.bookId,
            purchaseDate: req.body.purchaseDate,
          },
        }
      );
      return obj;
    } catch (e) {
      return e;
    }
  },
  singleBook: async (req, res) => {
    try {
      const bookId = req.body.bookId;
      const details = await borrowerModel
        .findOne({ bookId })
        .populate("bookId");
      return res.send(details);
    } catch (e) {
      return e;
    }
  },
  allBooks: async (req, res) => {
    try {
      var page = 1;
      const bookId = req.body.bookId;
      const details = await borrowerModel.findOne().populate("bookId")
      .skip(PER_PAGE * page - PER_PAGE)
      .limit(PER_PAGE);
      return res.send(details);
    } catch (e) {
      return e;
    }
  },
  daysleft :async (req, res) => {
    try {
      const date1 = new Date()
      const date2 = req.body.borrowedDate;
      const date3 = new Date(date2)
      const diffTime = Math.abs(date1 - date3);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const daysleft = 7-diffDays;
      return res.send(daysleft)

    } catch(e){
      return e;
    }
  }
};
