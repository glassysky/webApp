var express = require('express');
var router = express.Router();
var events = require('events');
var Emitter = events.EventEmitter;

var signUpController = require('../controller/signup.controller.js');
var signInController = require('../controller/signin.controller.js');
var publishController = require('../controller/publish.controller.js');

// 用户注册
router.post('/add', function(req, res, next) {
    var newUser = req.body;

    var addEE = new Emitter();
    addEE.on("finished", function(callback){
        if(callback.state === "success") {
            req.session.user = {
                _id: callback.data._id,
                stuID: callback.data.stuID,
                fullName: callback.data.fullName
            };
        }
        res.json(callback);
    });

    signUpController.addUser(newUser, addEE);
});
// 用户登录
router.post('/log', function(req, res, next) {
    var user = req.body,
        state,
        data;

    var logEE = new Emitter();

    logEE.on("finished", function(callback){
        if(callback.state === "success") {
            req.session.user = {
                _id: callback.data._id,
                stuID: callback.data.stuID,
                fullName: callback.data.fullName
            };
        }
        res.json(callback);
    });

    signInController.findUser(user, logEE);

});

// 用户登出
router.post('/logout', function (req, res, next) {
    req.session.destroy(function (err) {
        if (err) console.log(err);
        res.json({
            state: "success"
        });
    });
});

// 发表文章
router.post('/publish', function (req, res, next) {
    var news = req.body.body;
    var data = {};

    var pubEE = new Emitter();

    data.body = news;
    data.user = req.session.user;

    pubEE.on("published", function (callback) {
        res.json({
            state: "success",
            data: callback
        });
    });

    publishController.addNews(data, pubEE);

});

module.exports = router;
