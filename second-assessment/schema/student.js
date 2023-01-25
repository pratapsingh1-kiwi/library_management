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


module.exports = mongoose.model("student", schemaDraft);