var express = require('express');
var router = express.Router();
var events = require('events');
var Emitter = events.EventEmitter;

var signUpController = require('../controller/signup.controller.js');
var signInController = require('../controller/signin.controller.js');

// 用户注册
router.post('/add', function(req, res, next) {
    var newUser = req.body;

    var addEE = new Emitter();
    addEE.on("finished", function(callback){
        if(callback.state === "success") {
            req.session.user = {
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

module.exports = router;
