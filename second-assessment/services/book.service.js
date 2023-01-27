const Book = require("../model/book");

module.exports = {
  getAllBooks: async (next) => {
    try {
      const books = await Book.find();
      return books;
    } catch (e) {
      console.log(e.toString());
      next(e);
    }
  },
  addBook: async function (req) {
    const doc = new Book({
        book_name: req.body.book_name,
        author_name: req.body.author_name,
        genres: req.body.genres,
        publisher: req.body.publisher,
        quantity: req.body.quantity,
        price: req.body.price,
    });
    const obj = await doc.save()
    return obj;
},
  findBookById: async function (req) {
    try {
      const book = await Book.findOne({_id: req.body._id});
      return book;
    } catch (e) {
      console.log(e.toString());
      next(e);
    }
  },
};
