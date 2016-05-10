var express = require('express');
var router = express.Router();

var userController = require('../controller/signup.controller.js');

/* POST users listing. */
router.post('/add', function(req, res, next) {
    var newUser = req.body,
        message;

    // userController.addUser(newUser);
    if(userController.addUser(newUser)){
        message = "success";
    } else {
        message = "error";
    }

    res.json({
        message: message,
        data: newUser
    });
});

module.exports = router;
