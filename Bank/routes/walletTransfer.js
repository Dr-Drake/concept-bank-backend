var express = require("express");
var api = express.Router();
var errorHandler = require("../errorHandlers/handler")
var validatepin = require("../middlewares/validatePin")

// Models
const Account = require("../models/account")
const Transaction = require("../models/transaction")

async function initiateTransfer(debitAcc, creditAcc, amount) {
    try{
        // Find respective accounts
        const account_to_debit = await Account.findOne({
            accountNumber: debitAcc,
        })
    
        const account_to_credit = await Account.findOne({
            accountNumber: creditAcc
        })

        if (account_to_debit && account_to_credit){
            // Debit the Payer and Credit the Receiver
            account_to_debit.debit(amount)
            account_to_credit.credit(amount)

            // Instantiate and store the transaction
            Transaction.add(account_to_debit.accountNumber, account_to_credit.accountNumber, amount)
            }
        
    } catch (e){
        console.log(e)
    }    
}



api.post("/walletTransfer", validatepin, async (req, res)=>{
    if (req.body.type !== 3){
        var error = new Error("Invalid Transaction request")
        error.status = 400;
        return errorHandler(error, res);    
    }

    try{
        initiateTransfer(req.body.account_to_debit, req.body.account_to_credit, req.body.amount)
        res.status(200).json({message: "Transaction Successful",
        amount: req.body.amount})
    }
    catch (error){
        res.status(400).json({message: "Transaction Failed",
    error: error})
    }
})
    
module.exports = api;

