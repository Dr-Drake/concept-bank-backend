let buff1 = new Buffer.from("Drake", "base64");
let buff2 = new Buffer.from("Fintech123", "base64");

let username2 = buff1.toString("ascii")
let password2 = buff2.toString("ascii")

const username = encodeURI(username2)
const password = encodeURI("Fintech123")

module.exports = {
    mongoURI: `mongodb://localhost:27017/test`,
    mongoCFG:{
       // dbName: "test",
        useNewUrlParser: true
    }
};

//mongodb://cluster0-shard-00-00-iebwm.mongodb.net.:27017,cluster0-shard-00-01-iebwm.mongodb.net.:27017,cluster0-shard-00-02-iebwm.mongodb.net.:27017/test?authSource=admin&gssapiServiceName=mongodb&replicaSet=Cluster0-shard-0&ssl=true"

//cluster0-shard-00-02-iebwm.mongodb.net.:27017,cluster0-shard-00-01-iebwm.mongodb.net.:27017,cluster0-shard-00-00-iebwm.mongodb.net.:27017