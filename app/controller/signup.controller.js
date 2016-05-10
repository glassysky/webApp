var userModel = require('../model/usersModel.js');

module.exports = {
    addUser: function(user, Emitter){
        var query = userModel.findOne({ stuID: user.stuID });


        query.then(function (result) {

            var callback = {};

            if(result){
                // stuID has been registed

                callback.state = "failed";
                callback.data = "学号已被注册过";
                Emitter.emit("finished", callback);

            } else {
                // stuID can be registed

                var newUser = new userModel(user);

                newUser.save(function(err, user) {
                    if (err) {
                        return console.log(err);
                    }
                    callback.state = "success";
                    Emitter.emit("finished", callback);
                });
            }


        });

    }
}
