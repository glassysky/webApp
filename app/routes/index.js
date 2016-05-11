var express = require('express');
var router = express.Router();
var name = "";

/* GET home page. */
router.get('/', function(req, res, next) {
    var date = new Date();
    var time = date.getHours();
    var greeting = "";

    if (req.session.user) {
        name = req.session.user.fullName;
    } else {
        name = "同学";
    }

    if (time >= 7 && time < 9){
        greeting = "早上好";
    } else if (time >= 9 && time < 12) {
        greeting = "上午好";
    } else if (time >= 12 && time < 14) {
        greeting = "中午好";
    } else if (time >= 14 && time < 18) {
        greeting = "下午好";
    } else if (time >= 18 && time < 23) {
        greeting = "晚上好";
    } else if (time == 23 || (time >= 0 && time <9)) {
        greeting = "该休息了";
    }

    res.render('index', {
        name: name,
        greeting: greeting
     });
});

router.get('/signin', function(req, res, next) {
    if (req.session.user) {
        name = req.session.user.fullName;
    }
    res.render('signin', {
        name: name
     });
});

router.get('/signup', function(req, res, next) {
    if (req.session.user) {
        name = req.session.user.fullName;
    }
    res.render('signup', {
        name: name
    });
});

module.exports = router;
