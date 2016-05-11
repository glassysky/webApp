var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    fullName: String,
    passWord: String,
    stuID: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
