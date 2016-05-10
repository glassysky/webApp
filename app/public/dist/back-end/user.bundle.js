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

	'use strict';

	// stuID => 学号
	// pass => 密码
	var Q = __webpack_require__(10);

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
	            console.dir(user);

	            if (result) {
	                if (isMatch(user, result)) {
	                    // info match
	                    callback.state = "success";
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

	userSchema.methods.confirm = function () {
	    console.log("ok");
	};

	var User = mongoose.model('User', userSchema);

	// var bao = new User({
	//     name: 'bao'
	// });
	// bao.save(function(err, user) {
	//     if (err) return console.log(err);
	//     user.speak();
	// });
	// cui.save(function(err, user) {
	//     if (err) return console.log(err);
	//     user.speak();
	// });
	//
	// User.find(function (err, user) {
	//     if (err) return console.error(err);
	//     console.log(user);
	// });

	module.exports = User;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var userModel = __webpack_require__(3);

	module.exports = {
	    addUser: function addUser(user) {

	        var newUser = new userModel(user);

	        newUser.save(function (err, user) {
	            if (err) {
	                return console.log(err);
	            }
	            user.confirm();
	        });

	        return true;
	    },
	    test: function test() {
	        return 1;
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
	var EventEmitter = __webpack_require__(11);

	var signUpController = __webpack_require__(6);
	var signInController = __webpack_require__(2);

	/* POST users listing. */
	router.post('/add', function (req, res, next) {
	    var newUser = req.body,
	        state;

	    if (signUpController.addUser(newUser)) {
	        state = "success";
	    } else {
	        state = "error";
	    }

	    res.json({
	        state: state,
	        data: newUser
	    });
	});

	router.post('/log', function (req, res, next) {
	    var user = req.body,
	        state,
	        data;

	    var resEE = new EventEmitter();
	    resEE.on("finished", function (data) {
	        res.json(data);
	    });
	    // myEE.emit("finished", 'abc');

	    signInController.findUser(user, resEE);
	});

	module.exports = router;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("q");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("events");

/***/ }
/******/ ]);