var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/signin', function(req, res, next) {
    res.render('signin', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'Express' });
});

router.post('/add/user', function(req, res, next) {
    res.json({ message: 'success' });
});

module.exports = router;
