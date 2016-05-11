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

	module.exports = __webpack_require__(6);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mongoose = __webpack_require__(5);

	var userSchema = mongoose.Schema({
	    fullName: String,
	    passWord: String,
	    stuID: String
	});

	var User = mongoose.model('User', userSchema);

	module.exports = User;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(7);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var userModel = __webpack_require__(4);

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

/***/ }
/******/ ]);