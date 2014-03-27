//require a few things
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

//define user schema
var userSchema = mongoose.Schema({

    local            : {
        username     : String,
        password     : String
    }

});

//generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

//create the model for users and expose it
module.exports = mongoose.model('User', userSchema);
