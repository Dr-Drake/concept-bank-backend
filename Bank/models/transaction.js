const {connection, Schema} = require("mongoose");
const crypto = require("crypto");

const TransactionSchema = new Schema({
    account_credited_id:{
        type:Object,
        required:[true, "id should be an ObjectId"]
    },

    account_debited_id:{
        type: Object,
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
TransactionSchema.static("add", async function(debitAcc_id, creditAcc_id, amount){
    this.create({
        account_credited_id: creditAcc_id,
        account_debited_id: debitAcc_id,
        amount: amount
    })
})

module.exports = connection.model("Transaction", TransactionSchema);