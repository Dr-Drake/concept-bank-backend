const {connection, Schema} = require("mongoose");
const crypto = require("crypto");
const giveAccNo = require("../config/give_account")
const givePin = require("../config/give_secret")

const AccountSchema = new Schema({
    customer_id:{
        type:Object,
        required:[true, "id should be an ObjectId"]
    },

    accountType:{
        type: String,
        required: [true, "The type of account is required"],
        validate:{
            validator: function (value){
                var accTypes = ["savings", "current", "wallet"]
                return accTypes.includes(value)
            },
            message: "{VALUE} is not a valid account type",
        }
    },

    accountNumber:{
        type: Number,
        required:[true, "Account number is required"],
        minlength: 10,
        maxlength: 10,
        unique: true
    },

    balance:{
        type: Number,
        required: true
    },

    pin:{
        type: Number,
        minlength: 4,
        maxlength: 4,
        required: [true, "Pin must be a 4 digit number"]
    }
})

// Defining a document instance method for debiting
AccountSchema.method("debit", async function(amount){
    var difference = this.balance - amount
    if (this.balance <= 0){
        throw new Error("There is no money in this account")
    }

    if (difference < 0){
        throw new Error("Insufficient Funds")
    } else{
        this.balance = difference
        this.save()
    }
})

// Defining a document instance method for debiting
AccountSchema.method("credit", async function(amount){
    this.balance = this.balance + amount;
    this.save()
})


// Defining a static model method for creating an account
AccountSchema.static("add", async function(customer_id, accType, res){
   console.log("Account creating...")

   try{
        const acc = await this.findOne({
            
        })

       if (accType === "wallet"){
           await this.create({
               customer_id: customer_id,
                accountType: accType,
                accountNumber: giveAccNo(),
                balance: 0,
                pin: givePin()
            })
            console.log("Account created")
       } else {
        await this.create({
            customer_id: customer_id,
            accountType: accType,
            accountNumber: giveAccNo(),
            balance: 100000,
            pin: givePin()
        })
        console.log("Account created")
       }
    
   } catch(e){
       console.log("Account creation Error: "+e)
       return errorHandler(e, res);  
   }
    
    
})

// Compile the Mongoose schema into a model and export it
module.exports = connection.model("Account", AccountSchema)