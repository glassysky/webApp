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
    addEE.on("finished", function(data){
        res.json(data);
    });

    signUpController.addUser(newUser, addEE);
});

router.post('/log', function(req, res, next) {
    var user = req.body,
        state,
        data;

    var logEE = new EventEmitter();
    logEE.on("finished", function(data){
        res.json(data);
    });

    signInController.findUser(user, logEE);

});

module.exports = router;
