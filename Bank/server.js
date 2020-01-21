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

// Custom Error Handler
app.use(function(err, req, res, next) {
  const status = err.status || 500;
  console.log(`ERROR: ${status}`);
  //console.log(err.stack)
  res.status(status).json({
    message: err.message,
    error: err
  });
});

// Mongodb connection
mongoose.connect(config.mongoURI, config.mongoCFG).then(()=>{
  console.log("Connection to the Atlas Cluster is successful")
}).catch(
  (error)=> console.log(error.message)
)
console.log(config.mongoURI)
console.log(config.mongoCFG)

// Router level middlewares
app.use('/', fundRouter);
app.use('/', customerRouter);


// Listen for connection on port
const PORT = process.env.PORT || 2020
app.listen(PORT, () => console.log(`Bank Server running on port ${PORT}`));

