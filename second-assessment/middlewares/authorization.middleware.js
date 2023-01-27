const { tokenHelper } = require("../helper/token.helper")
const { userService } = require("../services");

module.exports = {
  isAdmin: async (req, res, next) => {
    const userId = req.userId;
    if (!userId) {
      res.locals.message = "Please login to continue.";
      return res.redirect("Please login to continue.");
    }
    const user = await userService.findUserById(userId);
    if (user.role !== "ADMIN") {
      res.locals.message = "You dont have permission to perform this action.";
      return res.send("You dont have permission to perform this action.");
    }
    next();
  },
};
