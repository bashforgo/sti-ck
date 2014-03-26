// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var orderSchema = mongoose.Schema({
        username     : String,
        sname        : String,
        snumber      : Number,
        name         : String,
        address1     : String,
        address2     : String,
        city         : String,
        postcode     : String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Order', orderSchema);
