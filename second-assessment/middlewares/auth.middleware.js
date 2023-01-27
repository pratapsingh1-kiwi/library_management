module.exports = {
  authentication: async (req, res, next) => {
    const jwt = require("jsonwebtoken");

    const t = req.headers.authorization;
    if (t != undefined) {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, "Protected", (err, decode) => {
        if (err) {
          console.log("Your token has been expired . Please enter new token");
          res.send("Your token has been expired . Please enter new token");
        } else {
          next();
        }
      });
    } else {
      res.send("You don't given token . Please enter token");
    }
  },
};
