var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        index: ['./entry/index.js']
    },
    output: {
        path: path.join(__dirname, "./public/dist/font-end/"),
        filename: "[name].bundle.js",
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: ['babel'], // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.json$/,
                loader: 'ejs-loader?variable=data'
            }
        ]
    }

}
