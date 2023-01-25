const express = require("express");
const app = express();
const connection = require("./db/connection");
const user = require('./routers/userRouter')
connection.con();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(user)
app.listen(3000)