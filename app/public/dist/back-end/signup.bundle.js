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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(2);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var userModel = __webpack_require__(3);

	module.exports = {
	    addUser: function addUser(user) {

	        var newUser = new userModel(user);

	        newUser.save(function (err, user) {
	            if (err) return console.log(err);
	            user.confirm();
	        });

	        return true;
	    },
	    test: function test() {
	        return 1;
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

/***/ }
/******/ ]);