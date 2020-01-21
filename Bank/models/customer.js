const {connection, Schema} = require("mongoose");
const crypto = require("crypto")
const Account = require("./account");
const giveAccNo = require("../config/give_account")
const errorHandler = require("../errorHandlers/handler")

// Define Customer schema
const CustomerSchema = new Schema({
    firstname:{
        type: String,
        required: [true, "First name is required"],
        validate: {
            validator: function (value){
                return /^[a-zA-Z]+$/.test(value)
            },
            message: "{VALUE} is not a valid firstname",
        }
    },

    lastname:{
        type: String,
        required: [true, "Last name is required"],
        validate: {
            validator: function (value){
                return /^[a-zA-Z]+$/.test(value)
            },
            message: "{VALUE} is not a valid last name",
        }
    },

    phoneNumber:{
        type: Number,
        minlength: 11,
        maxilength: 11,
        validate: {
            validator: function (value){
                return /^[0-9]+$/.test(value)
            },
            message: "{VALUE} is not a valid phone number",
        }
    }
})

// Defining a static model method for creating a customer
CustomerSchema.static("add", async function(options, res){
    try{
        // Does this customer already exist?
        const exist = await this.findOne({
            firstname: options.firstname,
            lastname: options.lastname
        })

        console.log(`What we found was ${exist}`)

        if (exist && options.account_type === "wallet") {
            Account.add(exist._id, options.account_type)
            
            return true
        } else if(exist) {
            var error = new Error("Customer already exists")
            error.status = 400;
            return errorHandler(error, res);  
        } else{
            // If not, create the new user

            if (options.phoneNumber){
                this.create({
                    firstname: options.firstname,
                    lastname: options.lastname,
                    phoneNumber: options.phoneNumber
                })

                console.log("account created with Phone number")
            } else {
                this.create({
                    firstname: options.firstname,
                    lastname: options.lastname
                })
                console.log("account created!")
            }

            return true
        }
    } catch(e){
        console.log(e)
        console.log("Customer creation error")
        return errorHandler(error, res);
    }
     
})


// Compile the Mongoose schema into a model and export it
module.exports = connection.model("Customer", CustomerSchema)