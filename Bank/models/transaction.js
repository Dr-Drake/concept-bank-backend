const {connection, Schema} = require("mongoose");
const crypto = require("crypto");

const TransactionSchema = new Schema({
    account_credited:{
        type: Number,
        required:[true, "id should be an ObjectId"]
    },

    account_debited:{
        type: Number,
        required: [true, "id should be an ObjectId"]
    },

    amount:{
        type: Number,
        required: true
    },

    date:{
        type: Date,
        default: new Date()
    },

    Comments: String
})

// Defining a static model method for creating transactions
TransactionSchema.static("add", async function(debitAcc, creditAcc, amount){
    this.create({
        account_credited: creditAcc,
        account_debited: debitAcc,
        amount: amount
    })
})

module.exports = connection.model("Transaction", TransactionSchema);