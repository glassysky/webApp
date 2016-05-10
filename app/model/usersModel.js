var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    fullName: String,
    passWord: String,
    stuID: String
});

userSchema.methods.confirm = function() {
    console.log("ok");
}

var User = mongoose.model('User', userSchema);

// var bao = new User({
//     name: 'bao'
// });
// bao.save(function(err, user) {
//     if (err) return console.log(err);
//     user.speak();
// });
// cui.save(function(err, user) {
//     if (err) return console.log(err);
//     user.speak();
// });
//
// User.find(function (err, user) {
//     if (err) return console.error(err);
//     console.log(user);
// });

module.exports = User;
