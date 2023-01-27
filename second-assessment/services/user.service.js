const student = require("../model/user.model");
const jwt = require('jsonwebtoken');
const bcryptjs = require("bcrypt");

// module.exports = {
//     findUserByEmail: async (email, next) => {
//         return await dbHelper.findOne(User, {email: email}, {}, next);
//     },
//     findUserById: async (id, next) => {
//         return await dbHelper.findOne(User, {_id: id}, {}, next);
//     },
//     createUser: async (body, next) => {
//         return await dbHelper.create(User, body, next);
//     },
//     updateUser: async (body, email, next) => {
//         return await dbHelper.update(User, body, {email: email}, next);
//     }
    
// }

module.exports = {
  getProfile: async (req, res, next) => {
    const userId = req.userId;
    const allPurchasedBooks = await borrowerService.findAllPurchasedBooks(
      userId,
      next
    );
    res.send({ books: allPurchasedBooks });
  },
  login: async function (req, res) {
    const { email, password } = req.body;
    const user = await student.findOne({email})
    if (!user) {
      res.locals.message = "User does not exist with this email.";
      return res.send("User does not exist with this email.");
    }
    if (!bcryptjs.compare(password, user.password)) {
      res.locals.message = "Incorrect password.";
      return res.send("Incorrect password");
    }
    const token = jwt.sign({ email: req.body.email }, "Protected");
    console.log(token)
     return token
    // student.findOne({ email: req.body.email }, async (err, val) => {
    //     if (err) {
    //       console.log(err);
    //       res.send(err);
    //     } else {
    //       if (val == null) {
    //         return "something went wrong"
    //       } else {
    //         if (val.active) {
    //           const password = req.body.password;
    //           const databasePassword = val.password;
  
    //           const bool = await bcryptjs.compare(password, databasePassword);
    //           if (bool) {
    //             const token = jwt.sign({ email: req.body.email }, "Protected");
    //             console.log(val);
    //             res.send({
    //               token: token,
    //               userInformation: val,
    //             });
    //           } else {
    //             return "password not match"
    //           }
    //         } else {
    //           return "not valid"
    //         }
    //       }
    //     }
    //   });
    },
  signup: async function (req) {
    const salt = await bcryptjs.genSalt(10);
    const securePassword = await bcryptjs.hash(req.body.password, salt);
    const doc = new student({
      name: req.body.name,
      email: req.body.email,
      password: securePassword,
      batch: req.body.batch,
      enrollment_no: req.body.enrollment_no,
      role: req.body.role
    });
    const obj = await doc.save()
    return obj;
},
  update: async function ( req, res ) {

    const object = await student.findOneAndUpdate({ email: req.body.email }, {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          batch: req.body.batch,
          enrollment_no: req.body.enrollment_no,
          role: req.body.role }
    });
    if(object == null){
        return process.env.USER_NOT_EXITS;
    }
    else{
        return process.env.USER_UPDATED;
    }
},
  delete : async function (req) {
      studentObject = await student.deleteOne({ email: req.body.email });
      if (studentObject.deletedCount === 0) {
        return "user not found";
      }
      return "user deleted";
    }

};