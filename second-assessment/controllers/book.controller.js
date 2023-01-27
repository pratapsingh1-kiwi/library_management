const { bookService, borrowerService, returnService } = require("../services");
const Book = require("../model/book");
const borrowerModel = require("../model/borrower.model")
const returnModel = require("../model/return.model")

module.exports = {
  displayBooks: async (req, res, next) => {
    const books = await bookService.getAllBooks(next);
    console.log(res.locals);
    res.send({ books });
  },
  addBookForm: function (req, res, next) {
    res.send("form/add-book");
  },
  addBook: async (req, res, next) => {
    console.log(req.body);
    const book = new Book(req.body);
    book.save(function (err, result) {
      if (err) throw err;
      return res.json(result);
    });
  },

  purchaseBook: async (req, res) => {
    const bookId = req.body.bookId;
    const userId = req.body.userId;
    const alreadyPurchased = await borrowerModel.findOne({bookId});
    const booknotexist = await Book.findOne({bookId});
    if (alreadyPurchased && alreadyPurchased.active) {
      // then show error
      res.send("User has already purchased this book");
    }
    else{

   

  //  book.quantity -= 1;
  //  await borrowerService.purchaseBook();
  const bookborrowed = new borrowerModel(req.body);
    bookborrowed.save(function (err, result) {
     //   Book.quantity -= 1;
      if (err) throw err;
      return res.send(result);
    })};
    res.send("successfully purchased");
  },
  returnBook: async (req, res, next) => {
    const userId = req.body.userId;
    const bookId = req.body.bookId;
    const purchasedBook = await borrowerService.findPurchaseBookById(
      userId,
      bookId,
      next
    );
    console.log("purchasedBook", purchasedBook);
    if (purchasedBook && !purchasedBook.active) {
      // book is already returned
      return res.send("Book is already returned.");
    }

    const book = await bookService.findBookById(bookId, next);
    console.log("book", book);
    if (!book) {
      // then show error
      res.locals.message = `Book id does not exist or maybe deleted.`;
      res.send("Book id does not exist or maybe deleted.");
    }

    purchasedBook.active = false;
    // make active:false in borrowerModel
    await borrowerService.updateBorrowerBook(
      userId,
      bookId,
      { active: false },
      next
    );
    res.send("book returned successfully");

    // const date1 = new Date(purchasedBook.purchaseDate);
    // const date2 = new Date();
    // const diffTime = Math.abs(date2 - date1);
    // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // add entry to return service
    await returnService.returnBook({ userId, bookId }, next);

    // calculate fine
    //     if (diffDays <= 7) {
    //       try {
    //         await fineService.createFine({ userId }, next);
    //       } catch (e) {
    //         console.log(e.toString());
    //       }
    //       return res.redirect("/user/profile");
    //     }

    //     // for every week 10 rs is fine

    //     const getTotalFine = (diffDays / 7) * 10;

    //     await fineService.createFine({ userId, amount: getTotalFine }, next);
    //     res.redirect("/user/profile");
  },
};
