const { tokenHelper } = require("../helper/token.helper")
const { userService } = require("../services");
const user = require("../model/user.model")

module.exports = {
  isAdmin: async (req, res, next) => {
    const email = req.body.email;
    if (!email) {
      res.locals.message = "Please login to continue.";
      return res.redirect("Please login to continue.");
    }
    const result = await user.findOne({email});
    if (result.role !== "ADMIN" || result.role !== "SUB_ADMIN" ) {
      return res.send("You dont have permission to perform this action.");
    }
    next();
  },
};
