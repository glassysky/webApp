// stuID => 学号
// pass => 密码
var Q = require('q');

var userModel = require('../model/usersModel.js');

function isMatch (user, result) {
    console.log(user.passWord);
    console.log(result.passWord);
    if (user.passWord === result.passWord) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    findUser: function(user ,Emitter) {
        var stuID = user.stuID;

        var query = userModel.findOne({
            stuID: stuID
        });

        query.then(function (result) {
            var callback = {};
            console.dir(user);

            if (result) {
                if (isMatch (user, result)) {
                    // info match
                    callback.state = "success";
                } else {
                    // error password
                    callback.state = "failed";
                    callback.data = "密码错误";
                }
            } else {
                // error stuID
                callback.state = "failed";
                callback.data = "学号错误";
            }

            Emitter.emit("finished", callback);
        });

    }
}
