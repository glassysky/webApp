var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    fullName: String,
    passWord: String,
    stuID: String
});

// userSchema.methods.confirm = function() {
//     console.log("ok");
// }

var User = mongoose.model('User', userSchema);

module.exports = User;
