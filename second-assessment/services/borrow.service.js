const { borrowerModel } = require("../model/borrower.model");

module.exports = {
  purchaseBook: async (req) => {
    try {
        const doc = new borrowerModel({
            userId: req.body.userId,
            bookId: req.body.bookId
        });
        const obj = await doc.save()
        return obj;
    } catch (e) {
      console.log(e.toString());
      next(e);
    }
  },
  findPurchaseBookById: async (userId, bookId, next) => {
    try {
      return await dbHelper.findOne(
        borrowerModel,
        { userId, bookId },
        {},
        next
      );
    } catch (e) {
      console.log(e.toString());
      next(e);
    }
  },
  findAllPurchasedBooks: async (userId, next) => {
    try {
      return await dbHelper.findAll(
        borrowerModel,
        { userId, active: true },
        { populate: "bookId" },
        next
      );
    } catch (e) {
      console.log(e.toString());
      next(e);
    }
  },
  updateBorrowerBook: async (userId, bookId, body, next) => {
    try {
      return await dbHelper.update(
        borrowerModel,
        body,
        { userId, bookId },
        next
      );
    } catch (e) {
      console.log(e.toString());
      next(e);
    }
  },
};
