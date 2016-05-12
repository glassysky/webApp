// stuID => 学号
// pass => 密码

var userModel = require('../model/usersModel.js');
var newsModel = require('../model/newsModel.js');

module.exports = {
    // data.user
    // data.user._id
    // data.user.fullName
    // data.user.stuID
    // data.body
    addNews: function (data, Emitter) {
        var newsInfo = {
            fullName: data.user.fullName,
            stuID: data.user.stuID,
            body: data.body
        }
        var news = new newsModel(newsInfo);

        news.save(function (err, news) {
            if (err) console.dir(err);
            Emitter.emit("published", news);
        });
    }
}
