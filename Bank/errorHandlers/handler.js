var util = require("util");

function handleError(err, res) {

   // console.log(`ERROR!: ${err.status}`)
   res.status(err.status).json({
    message: err.message,
    error: err
  });
    
}   


util.inherits(handleError, Error);

module.exports = handleError;