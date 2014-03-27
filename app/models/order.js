var mongoose = require('mongoose');

//define the order schema
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

//expose it
module.exports = mongoose.model('Order', orderSchema);
