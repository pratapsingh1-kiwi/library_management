const book = require("../model/book");
const { borrowerModel } = require("../model/borrower.model");

module.exports = {
  returnBook: async (req, res) => {
    try {
      const userId = req.body.userId;
      const bookId = req.body.bookId;
      const book = await borrowerModel.findOne({ bookId });
      if (!book) {
        return res.send("Book already returned");
      } else {
        const purchasedBook = await borrowerModel.deleteOne({ bookId });
        return res.send("Book returned successfully");
      }
    } catch (e) {
      return e;
    }
  },
};
