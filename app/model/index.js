// mongodb connect
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected');
});
