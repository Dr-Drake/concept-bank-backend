const Account = require("../models/account")  

async function validatepin(req, res, next) {
    // Validate the pin
    try{
        const account = await Account.findOne({
            accountNumber: req.body.account_to_debit
        })

        if (account){
            if (req.body.pin !== account.pin){
                var error = new Error("Invalid pin")
                error.status = 400;
                next(error)

                console.log("Invalid pin")
                console.log(account)
            } else {
                req.body.validation = 102030
                next()
            }
        } else {
            var error = new Error("Account does not exist")
            error.status = 400;
            next(error)
        }
    } catch(e){
        console.log("ERROR!")
        console.log(e)
        next(e)
    }
}

module.exports = validatepin
    