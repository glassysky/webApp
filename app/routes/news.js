var express = require('express');
var router = express.Router();
var events = require('events');
var Emitter = events.EventEmitter;

var newsController = require('../controller/news.controller.js');

// 发表动态
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

    newsController.addNews(data, pubEE);

});

router.post('/show', function (req, res, next) {
    var showEE = new Emitter();

    showEE.on("finished", function (callback) {
        res.json({
            state: "success",
            data: callback
        });
    });

    newsController.getNews(showEE);
});

module.exports = router;
