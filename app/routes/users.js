var express = require('express');
var router = express.Router();
var EventEmitter = require('events');

var signUpController = require('../controller/signup.controller.js');
var signInController = require('../controller/signin.controller.js');

/* POST users listing. */
router.post('/add', function(req, res, next) {
    var newUser = req.body,
        state;

    if(signUpController.addUser(newUser)){
        state = "success";
    } else {
        state = "error";
    }

    res.json({
        state: state,
        data: newUser
    });
});

router.post('/log', function(req, res, next) {
    var user = req.body,
        state,
        data;

    var resEE = new EventEmitter();
    resEE.on("finished", function(data){
        res.json(data);
    });
    // myEE.emit("finished", 'abc');

    signInController.findUser(user, resEE);

});

module.exports = router;
