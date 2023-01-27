var express = require("express");
var router = express.Router();
const Book = require("../../model/book");
const { bookController } = require("../../controllers");
const {
  authMiddleware,
  authrorizationMiddleware,
} = require("../../middlewares");

/* GET home page. */
router.get("/", bookController.displayBooks);
router.get(
  "/add-book",
  authMiddleware.authentication,
  authrorizationMiddleware.isAdmin,
  bookController.addBookForm
);
router.post("/add-book", authMiddleware.authentication, bookController.addBook);
router.post(
  "/purchase",
  authMiddleware.authentication,
  bookController.purchaseBook
);
router.get("/return", authMiddleware.authentication, bookController.returnBook);
router.get("/displayAll", authMiddleware.authentication, bookController.displayBooks)


module.exports = router;
