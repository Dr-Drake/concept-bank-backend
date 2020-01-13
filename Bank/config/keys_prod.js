module.exports = {
    mongoURI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-iebwm.mongodb.net/test`,
    mongoCFG:{
        useNewUrlParser: true,
        retryWrites: true,
        w: "majority"
    }
};