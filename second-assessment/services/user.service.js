const student = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcrypt");
const PER_PAGE = 5;

module.exports = {
  getProfile: async (req, res, next) => {
    var page = req.body.page;
    const allPurchasedBooks = await borrowerService.findAllPurchasedBooks()
    .skip(PER_PAGE * page - PER_PAGE)
      .limit(PER_PAGE);
    res.send({ books: allPurchasedBooks });
  },
  loginuser: async function (req, res) {
    const { email, password } = req.body;
    const user = await student.findOne({ email });
    if (!user) {
      return res.send("User does not exist with this email.");
    }
    if (!bcryptjs.compare(password, user.password)) {
      return res.send("Incorrect password");
    }
    const token = jwt.sign({ email: req.body.email }, "Protected");
    console.log(token);
    return token;
  },
  signupuser: async function (req) {
    const salt = await bcryptjs.genSalt(10);
    const securePassword = await bcryptjs.hash(req.body.password, salt);
    const doc = new student({
      name: req.body.name,
      email: req.body.email,
      password: securePassword,
      batch: req.body.batch,
      enrollment_no: req.body.enrollment_no,
      token: req.body.token,
      role: req.body.role
    });
    const obj = await doc.save();
    return obj;
  },
  updateuser: async function (req, res) {
    const object = await student.findOneAndUpdate(
      { email: req.body.email },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: securePassword,
          batch: req.body.batch,
          enrollment_no: req.body.enrollment_no,
          token: req.body.token,
          role: req.body.role
        },
      }
    );
    if (object == null) {
      return process.env.USER_NOT_EXITS;
    } else {
      return process.env.USER_UPDATED;
    }
  },
  deleteuser: async function (req, res) {
    const email = req.body;
    studentObject = await student.deleteOne({ email });
    if (studentObject.deletedCount === 0) {
      return process.env.USER_NOT_EXITS;
    }
    return process.env.DELETE_SUCCESSFULLY;
  },
};
