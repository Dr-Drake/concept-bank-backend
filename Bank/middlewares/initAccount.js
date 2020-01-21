const Customer = require("../models/customer");
const errorHandler = require("../errorHandlers/handler")
var initUrl ="";

if (process.env.NODE_ENV === "development"){
    initUrl = "http://localhost:2020/initaccount"
} else {
    initUrl = "https://bankfintech.herokuapp.com/initaccount"
}

// Function to run a request for creating a customer account
async function initaccount(req, res, next){
    try{

        const user = await Customer.findOne({
            firstname: req.query.firstname,
            lastname: req.query.lastname
        })

        if (user){
            req.user = user;
            next()
           /* var payload = {
                ID: user._id,
                firstname: req.query.firstname,
                lastname: req.query.lastname,
                account_type: req.query.account_type 
            }
    
            axios.post(initUrl, payload).then(function(response){
                console.log("posted")
                console.log(response.data)
            }).catch((error)=>{
                console.log(error.message)
            })*/
        }
        

    } catch(error){
        console.log(error.message)
        var error = new Error("Customer account initialization failed")
        error.status = 400;
        return errorHandler(error, res); 
    }
}

// Function to run after certain 
function start(req, res, next){
    setTimeout(function(){
        initaccount(req, res, next)
    }, 10000)
    //next()
}

module.exports = start