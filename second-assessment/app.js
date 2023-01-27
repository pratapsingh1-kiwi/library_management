require("dotenv").config(); // load env file
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var indexRouter = require("./routes/index");
var bookRouter = require("./routes/book/index");
var userRouter = require("./routes/user.route");
const mongoose = require("mongoose");
const app = express();
const connection = require("./db/connection");
connection.con();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use("/", indexRouter);
app.use(bookRouter);
app.use(userRouter);
app.listen(3000);
module.exports = app;