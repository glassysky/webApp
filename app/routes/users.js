var express = require('express');
var router = express.Router();
var EventEmitter = require('events');

var signUpController = require('../controller/signup.controller.js');
var signInController = require('../controller/signin.controller.js');

/* POST users listing. */
router.post('/add', function(req, res, next) {
    var newUser = req.body,
        state;

    var addEE = new EventEmitter();
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

router.post('/log', function(req, res, next) {
    var user = req.body,
        state,
        data;

    // var logEE = new EventEmitter();
    // logEE.on("finished", function(callback){
    //     if(callback.state === "success") {
    //         req.session.user = {
    //             stuID: callback.data.stuID,
    //             fullName: callback.data.fullName
    //         };
    //     }
    //     res.json(callback);
    // });
    //
    // signInController.findUser(user, logEE);

    res.json({
        state: "success",
        data: "test"
    });

});

module.exports = router;
