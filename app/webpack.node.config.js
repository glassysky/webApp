var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });


module.exports = {
    target: 'node',
    entry: {
        index: ['./entry/back-end/index.js']
    },
    output: {
        path: path.join(__dirname, "./public/dist/back-end/"),
        filename: "[name].bundle.js",
        publicPath: '/dist/'
    },
    externals: nodeModules,
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
