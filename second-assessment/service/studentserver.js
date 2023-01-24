const student = require('../schema/student')


const studentSignup = async function (req) {
        student.find(async (err, val) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                if (val != null) {
                    const doc = new student({
                        name: req.body.name,
                        enrollment_no : req.body.enrollment_no,
                        class : req.body.class,
                        phone_number : req.body.phone_number,
                        address : req.body.address,
                        gender : req.body.gender,
                        email : req.body.email,
                        password : req.body.password
                    });
                    const obj = await doc.save()
                    console.log("user has been saved");
                    res.send(obj);
    
                }
            }
        })
    }


const studentLogin = function (req, res) {
    user.findOne({ email: req.body.email }, async (err, val) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          if (val == null) {
            console.log("Here is no data for login");
            res.send("Here is no data for login");
          } else {
            if (val.active) {
              const password = req.body.password;
              const databasePassword = val.password;
  
              const bool = await bcryptjs.compare(password, databasePassword);
              if (bool) {
                const token = jwt.sign({ email: req.body.email }, "Protected");
                console.log(val);
                res.send({
                  token: token,
                  userInformation: val,
                });
              } else {
                res.send("Password does not match");
                console.log("password does not match");
              }
            } else {
              console.log("User is not active");
              res.send("User is not active");
            }
          }
        }
      });
    };

const studentUpdate = async function (req, res) {

        const object = await userModel.findOneAndUpdate({ email: req.body.email }, {
            $set: {
                name: req.body.name,
                enrollment_no : req.body.enrollment_no,
                class : req.body.class,
                phone_number : req.body.phone_number,
                address : req.body.address,
                gender : req.body.gender,
                email : req.body.email,
                password : req.body.password            }
        });
        if(object == null){
            return process.env.USER_NOT_EXITS;
        }
        else{
            return process.env.USER_UPDATED;
        }
    }

    module.exports = {
        studentSignup,
        studentLogin,
        studentUpdate
    
    }

