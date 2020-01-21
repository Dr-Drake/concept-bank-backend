var express = require("express");
var api = express.Router();
const Customer = require("../models/customer");
const Account = require("../models/account")
const axios = require("axios")
const giveAccNo = require("../config/give_account")
const initaccount = require("../middlewares/initAccount")


// Function for logging when async is finished
const log = (...obj) => (
    obj.forEach(o => console.dir(o, { colors: true }))
);

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
       
       /* info_use.firstname = req.body.firstname;
        info_use.lastname = req.body.lastname;
        info_use.account_type = req.body.account_type*/
        
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
        
      /*  var details ={
            firstname: req.query.firstname,
            lastname: req.query.lastname,
            account_type: req.query.account_type
        }*/

       // console.log(details)
        // Create the new customer
        var stat = await Customer.add(req.query, res)
        console.log(stat)
        if (stat === true){
           var redirectUri = `/initaccount`+ `?status=done`+
            `&firstname=${req.query.firstname}`+
            `&lastname=${req.query.lastname}`+
            `&account_type=${req.query.account_type}`
            res.redirect(redirectUri)
            //start();
            //res.status(200).json({message:"Account creation initiated"})
        } else {
            res.status(400).json({message: "Action failed"})
        }
        
    } else {
        res.status(403).json({message: "Unauthorized request",
    code: 00123})
    }
})

api.get("/initaccount", initaccount, async (req, res)=>{
    console.log("Account creation starting...")
    
   try{
       await Account.add(req.user._id, req.query.account_type, res)
       res.status(200).json({
        message: "Success",
        //accountNumber: acctNo
    })
   } catch(e){
       res.status(400).json({
           error: e
       })
   }
    
    //console.log(`${req.user.firstname}'s is ${acctNo}`)

    
})


module.exports = api;