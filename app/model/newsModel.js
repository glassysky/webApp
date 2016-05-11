var mongoose = require('mongoose');

var newsSchema = mongoose.Schema({
    fullName: String,
    stuID: String,
    dataTime: String,
    comments: Object
});

var News = mongoose.model('News', newsSchema);

module.exports = News;
