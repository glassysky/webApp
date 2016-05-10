var userModel = require('../model/usersModel.js');

module.exports = {
    addUser: function(user){

        var newUser = new userModel(user);

        newUser.save(function(err, user) {
            if (err) return console.log(err);
            user.confirm();
        });

        return true;
    },
    test: function(){
        return 1;
    }
}
