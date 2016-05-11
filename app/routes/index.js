var express = require('express');
var ejs = require('ejs');
var router = express.Router();
var name = "";

var weekMap = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

/* GET home page. */
router.get('/', function(req, res, next) {
    var date = new Date(),
        time = date.getHours(),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        week = date.getDay(),
        greeting = '',
        time = '';

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

    time = year + "年" + month + "月" + day;
    week = weekMap[week];

    res.render('index', {
        name: name,
        greeting: greeting,
        time: time,
        week: week
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
