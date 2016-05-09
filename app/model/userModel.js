import mongoose from 'mongoose';

let userSchema = mongoose.Schema({
    name: String
});

userSchema.methods.speak = function() {
    let greeting = this.name
        ? "my name is " + this.name
        : "i forget my name";
    console.log(greeting);
}

let User = mongoose.model('User', userSchema);

let bao = new User({ name: 'bao' });
let cui = new User({ name: 'cui' });

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
