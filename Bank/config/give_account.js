const Account = require("../models/account")

function generateAccNo(){
    // Math.random() generates a random floating-point between 0-1
    // Math.floor() selects the largest "integer" less than or equal
    // to the number passed to it

    var accountNo = "";

    for (i=0; i < 10; i++){

        // Generate a random number between 0 and 10 (exclusive of 10)
        var num = Math.floor(Math.random()* (10 - 0)) + 0;
        accountNo = accountNo+num.toString()
    }

    return Number(accountNo)

}

// Function for checking if account number exists
async function isTaken (accountNo){
    try{
        const accNo = await Account.findOne({accountNumber: accountNo})
        console.log(`isTaken is checking ${accountNo}`)

        
        if (accNo){
            console.log("It exists!!!")
            return true
        } else {
            console.log("Account number is not taken")
            return false
            
        }
    } catch(error) {
        console.log("isTaken Error: " + error.message)
    }
    

    


}

// Function for generating a unique account number
function giveAccNo (){
    var accNo = generateAccNo()

    for(;;){
        // If the account number is taken a new one will be generated
        if (isTaken(accNo) === false){
            console.log("We ready")
            break
        } else {
            accNo = generateAccNo()
        }
        return accNo
    } 
}

module.exports = giveAccNo