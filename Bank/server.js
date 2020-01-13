var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors")


const mongoose = require("mongoose")
const config = require(__dirname + "/config/keys")

var fundRouter = require("./routes/walletTransfer")
var customerRouter = require("./routes/createAccount")


// Server
var app = express();

// Midllewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Mongodb connection
mongoose.connect(config.mongoURI, config.mongoCFG).catch(
  (error)=> console.log(JSON.stringify(error))
)
console.log(process.env.PROD_MONGODB)
console.log(config.mongoCFG)

// Router level middlewares
app.use('/', fundRouter);
app.use('/', customerRouter);


// Listen for connection on port
const PORT = process.env.PORT || 2020
app.listen(PORT, () => console.log(`Bank Server running on port ${PORT}`));

