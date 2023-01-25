const student = require('../schema/student')


const studentSignup = async function (req) {
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
                    return obj;

    
                }
            
      



const studentLogin = function (req, res) {
    student.findOne({ email: req.body.email }, async (err, val) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          if (val == null) {
            return "something went wrong"
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
                return "password not match"
              }
            } else {
              return "not valid"
            }
          }
        }
      });
    };

const studentUpdate = async function (req, res) {

        const object = await student.findOneAndUpdate({ email: req.body.email }, {
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
    
    const array = async function (req) {
    var update =[];
    update.push({
      name: req.body.name,
                enrollment_no : req.body.enrollment_no,
                class : req.body.class,
                phone_number : req.body.phone_number
    })
    return update
  }

    module.exports = {
        studentSignup,
        studentLogin,
        studentUpdate,
        array
    
    }

