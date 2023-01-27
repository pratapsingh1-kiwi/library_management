const { returModel } = require("../model/return.model");

module.exports = {
  returnBook: async (body, next) => {
    try {
        const doc = new returModel({
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
  findReturnBookById: async (userId, bookId, next) => {
    try {
      return await dbHelper.findOne(returModel, { userId, bookId }, {}, next);
    } catch (e) {
      console.log(e.toString());
      next(e);
    }
  },
};
