const Book = require("../model/book");
const PER_PAGE = 5;
module.exports = {
  getAllBooks: async (req) => {
    var page = req.body.page;
    try {
      const books = await Book.find()
      .skip(PER_PAGE * page - PER_PAGE)
      .limit(PER_PAGE);
      return books;
    } catch (e) {
      return e;
    }
  },
  addBook: async function (req) {
    const doc = new Book({
      book_name: req.body.book_name,
      author_name: req.body.author_name,
      genres: req.body.genres,
      publisher: req.body.publisher,
      price: req.body.price,
    });
    const obj = await doc.save();
    return obj;
  },
  findBookById: async function (req) {
    try {
      const book = await Book.findOne({ _id: req.body._id });
      return book;
    } catch (e) {
      return e;
    }
  },
  updateBook: async function (req) {
    try {
      const object = await Book.findOneAndUpdate(
        { _id: req.body._id },
        {
          $set: {
            book_name: req.body.book_name,
            author_name: req.body.author_name,
            genres: req.body.genres,
            publisher: req.body.publisher,
            price: req.body.price,
          },
        }
      );
    } catch (e) {
      return e;
    }
  },
  deleteBook: async function (req) {
    try {
      const bookId = req.body;
      studentObject = await Book.deleteOne({ bookId });
    } catch (e) {
      return e;
    }
  },
  findByDate: async function (req) {
    try {
      const purchaseDate = req.body.purchaseDate;
      const details = await borrowerModel.findOne({ purchaseDate });
      return details;
    } catch (e) {
      return e;
    }
  },
};
