const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const parser = require("body-parser");
const gateway = require('./routes/gateway');
const peripheral = require('./routes/peripheral');
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();

const root = "/api/v1"
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(parser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(`${root}/gateway`, gateway);
app.use(`${root}/peripheral`, peripheral);

mongoose.connect(
    "mongodb://mongo:27017/gateway",
    { useNewUrlParser: true },
    () => console.log("Connected to DB")
)

const connection = mongoose.connection

connection.once("open", _ => {
  console.log("Database connected");

});

connection.on("error", error => {
  console.error("Connection error: ", error)
});
module.exports = app;
