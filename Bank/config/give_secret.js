function generatePin(){
    // Math.random() generates a random floating-point between 0-1
    // Math.floor() selects the largest "integer" less than or equal
    // to the number passed to it

    var pin = "";

    for (i=0; i < 4; i++){

        // Generate a random number between 0 and 10 (exclusive of 10)
        var num = Math.floor(Math.random()* (10 - 0)) + 0;
        pin = pin+num.toString()
    }

    return Number(pin)

}

module.exports = generatePin