//console.log(new Date())


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

var accNo = generateAccNo()
console.log(accNo)