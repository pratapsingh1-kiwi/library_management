const express = require('express');
const user = express.Router();

const studentController = require('../controller/studentcontroller');
const userSignup = studentController.Signup;
const userLogin = studentController.login;
const userUpdate = studentController.Update;
user.post('/signup',userSignup);
user.get('/login',userLogin);
user.put('/update',userUpdate);

module.exports = user;