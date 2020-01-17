var express = require("express");
var api = express.Router();
const Customer = require("../models/customer");
const Account = require("../models/account")
const axios = require("axios")
const giveAccNo = require("../config/give_account")

var initUrl ="";

if (process.env.NODE_ENV === "development"){
    initUrl = "http://localhost:2020/initaccount"
} else {
    initUrl = "https://bankfintech.herokuapp.com/initaccount"
}

// Function for logging when async is finished
const log = (...obj) => (
    obj.forEach(o => console.dir(o, { colors: true }))
);



var info_use = {
    firstname: "",
    lastname: "",
    account_type: ""
}


// Function to run a request for creating a customer account
async function initaccount(){
    try{

        const user = await Customer.findOne({
            firstname: info_use.firstname,
            lastname: info_use.lastname
        })

        if (user){
            var payload = {
                ID: user._id,
                firstname: info_use.firstname,
                lastname: info_use.lastname,
                account_type: info_use.account_type 
            }
    
            axios.post(initUrl, payload).then(function(response){
                console.log("posted")
                console.log(response.data)
            }).catch((error)=>{
                console.log(error.message)
            })
        }
        

    } catch(error){
        console.log(error.message)
    }
}

// Function to run after certain 
function start(){
    setTimeout(initaccount, 10000)
}

api.get("/checkdb", async(req, res)=>{
    // Get the customer for their id
    try{
        const user = await Customer.findOne({
            firstname: req.query.firstname,
            lastname: req.query.lastname
        })

        res.status(200).json({status: "Found",
    usr: `${user._id}`})
    } catch (e){
        res.status(400).json({status: "Not Found", error: e})
    }
})

api.post("/createAccount", (req, res)=>{
    if (req.body.requester && req.body.requester === "user1"){
       
        info_use.firstname = req.body.firstname;
        info_use.lastname = req.body.lastname;
        info_use.account_type = req.body.account_type
        
        var redirectUri = `/initcustomer`+
        `?requester=user1`+`&access=cheesepie`+
        `&firstname=${req.body.firstname}`+
        `&lastname=${req.body.lastname}`+
        `&account_type=${req.body.account_type}`
        res.redirect(redirectUri)

    } else {
        res.status(403).json({message: "Unauthorized request"})
    }
    
})

api.get("/initcustomer", async function(req, res){
    console.log("Initiating customer...")
    if (req.query.requester && req.query.requester === "user1"){
        
        var details ={
            firstname: req.query.firstname,
            lastname: req.query.lastname,
            account_type: req.query.account_type
        }

        console.log(details)
        // Create the new customer
        var stat = await Customer.add(details)
        console.log(stat)
        if (stat === true){
           /* var redirectUri = `/checkdb`+ `?status=done`+
            `&firstname=${req.query.firstname}`+
            `&lastname=${req.query.lastname}`+
            `&account_type=${req.query.account_type}`
            res.redirect(redirectUri)*/
            start();
            res.status(200).json({message:"Account creation initiated"})
        } else {
            res.status(400).json({message: "Action failed"})
        }
        
    } else {
        res.status(403).json({message: "Unauthorized request",
    code: 00123})
    }
})

api.post("/initaccount", async (req, res)=>{
    console.log("Account creation starting...")
    
    var acctNo = giveAccNo()
    Account.add(req.body.ID, acctNo, req.body.account_type)

    console.log(`${req.body.firstname}'s account has been created`)
    console.log(`${req.body.firstname}'s is ${acctNo}`)

    res.status(200).json({
        message: "Success",
        accountNumber: acctNo
    })
})


module.exports = api;