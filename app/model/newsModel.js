var mongoose = require('mongoose');

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
