var express = require("express");
var router = express.Router();
const { userController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

/* GET home page. */
router.get("/login", userController.login);
router.get("/signup", userController.signup);
router.get(
  "/profile",
  authMiddleware.authentication,
  userController.getProfile
);
router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.put("/update", userController.update);

module.exports = router;
