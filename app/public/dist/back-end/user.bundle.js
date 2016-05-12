/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	// stuID => 学号
	// pass => 密码

	var userModel = __webpack_require__(3);

	function isMatch(user, result) {
	    console.log(user.passWord);
	    console.log(result.passWord);
	    if (user.passWord === result.passWord) {
	        return true;
	    } else {
	        return false;
	    }
	}

	module.exports = {
	    findUser: function findUser(user, Emitter) {
	        var stuID = user.stuID;

	        var query = userModel.findOne({
	            stuID: stuID
	        });

	        query.then(function (result) {
	            var callback = {};
	            // console.dir(user);

	            if (result) {
	                if (isMatch(user, result)) {
	                    // info match
	                    callback.state = "success";
	                    callback.data = result;
	                } else {
	                    // error password
	                    callback.state = "failed";
	                    callback.data = "密码错误";
	                }
	            } else {
	                // error stuID
	                callback.state = "failed";
	                callback.data = "学号错误";
	            }

	            Emitter.emit("finished", callback);
	        });
	    }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mongoose = __webpack_require__(4);

	var userSchema = mongoose.Schema({
	    fullName: String,
	    passWord: String,
	    stuID: String
	});

	var User = mongoose.model('User', userSchema);

	module.exports = User;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var userModel = __webpack_require__(3);

	module.exports = {
	    addUser: function addUser(user, Emitter) {
	        var query = userModel.findOne({ stuID: user.stuID });

	        query.then(function (result) {

	            var callback = {};

	            if (result) {
	                // stuID has been registed

	                callback.state = "failed";
	                callback.data = "学号已被注册过";
	                Emitter.emit("finished", callback);
	            } else {
	                // stuID can be registed

	                var newUser = new userModel(user);

	                newUser.save(function (err, user) {
	                    if (err) {
	                        return console.log(err);
	                    }
	                    callback.state = "success";
	                    callback.data = user;
	                    Emitter.emit("finished", callback);
	                });
	            }
	        });
	    }
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(8);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(9);
	var router = express.Router();
	var events = __webpack_require__(10);
	var Emitter = events.EventEmitter;

	var signUpController = __webpack_require__(6);
	var signInController = __webpack_require__(2);
	var publishController = __webpack_require__(11);

	// 用户注册
	router.post('/add', function (req, res, next) {
	    var newUser = req.body;

	    var addEE = new Emitter();
	    addEE.on("finished", function (callback) {
	        if (callback.state === "success") {
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
	router.post('/log', function (req, res, next) {
	    var user = req.body,
	        state,
	        data;

	    var logEE = new Emitter();

	    logEE.on("finished", function (callback) {
	        if (callback.state === "success") {
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

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("events");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// stuID => 学号
	// pass => 密码

	var userModel = __webpack_require__(3);
	var newsModel = __webpack_require__(12);

	module.exports = {
	    // data.user
	    // data.user._id
	    // data.user.fullName
	    // data.user.stuID
	    // data.body
	    addNews: function addNews(data, Emitter) {
	        var newsInfo = {
	            fullName: data.user.fullName,
	            stuID: data.user.stuID,
	            body: data.body
	        };
	        var news = new newsModel(newsInfo);

	        news.save(function (err, news) {
	            if (err) console.dir(err);
	            Emitter.emit("published", news);
	        });
	    }
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mongoose = __webpack_require__(4);

	// sub-document
	var commentsSchema = mongoose.Schema({
	    fullName: String,
	    body: String,
	    date: Date
	});

	var newsSchema = mongoose.Schema({
	    fullName: String,
	    stuID: String,
	    body: String,
	    date: {
	        type: Date,
	        default: Date.now
	    },
	    comments: [commentsSchema]
	});

	var News = mongoose.model('News', newsSchema);

	module.exports = News;

/***/ }
/******/ ]);