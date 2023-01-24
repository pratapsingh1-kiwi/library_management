const student = () => {

    const mongoose = require('mongoose');

    const schemaDraft = new mongoose.Schema({

        name : String,
        enrollment_no : String,
        class : String,
        phone_number : String,
        address : String,
        gender : String,
        email : String,
        password : String,
        isAdmin : {
            type : Boolean,
            default : false
        }
    });
    return schemaDraft;
}

module.exports.schemaDraft = student;