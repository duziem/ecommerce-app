// This file will handle connection logic to the MongoDB database

//const promiseRetry = require('promise-retry');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

/*
const options = {
    useNewUrlParser: true,
    reconnectTries: 60,
    reconnectInterval: 1000,
    poolSize: 10,
    bufferMaxEntries: 0 // If not connected, return errors immediately rather than waiting for reconnect
}
*/
mongoose.connect('mongodb://localhost:27017/ecommerce-db?retryWrites=true', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to MongoDB successfully :)");
}).catch((e) => {
    console.log("Error while attempting to connect to MongoDB");
    console.log(e);
});


// To prevent deprectation warnings (from MongoDB native driver)
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


module.exports = {
    mongoose
};