var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        index: ['./entry/font-end/index.js'],
        signin: ['./entry/font-end/signin.js'],
        signup: ['./entry/font-end/signup.js']
    },
    output: {
        path: path.join(__dirname, "./public/dist/font-end/"),
        filename: "[name].bundle.js",
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: ['babel'], // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                loader: "style!css!sass"
            }
        ]
    }

}
