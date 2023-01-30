//require("dotenv").config(); // load env file
var express = require("express");
var bodyParser = require("body-parser");
var indexRouter = require("./routes/index");
const mongoose = require("mongoose");
var imageRouter = require("./routes/profile")
const app = express();
const connection = require("./db/connection");
connection.con();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use("/", indexRouter);
app.use(imageRouter)
app.listen(3000);
module.exports = app;
