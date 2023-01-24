const express = require("express");
const app = express();
const connection = require("./db/connection");
connection.con();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());