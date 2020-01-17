var util = require("util");

function handleError(err, res) {

   // console.log(`ERROR!: ${err.status}`)
    res.status(err.status)
    
}   


util.inherits(handleError, Error);

module.exports = handleError;