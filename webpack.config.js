var webpack = require("webpack");
var path = require("path");
module.exports = {
    devtool: 'sourcemap',
    entry: {
        desktop: "./client/app.js",
        vendors: [
            "react",
            "react-dom",
            "react-bootstrap",
            "redux-simple-router",
            "react-router",
            "history",
            "moment",
            'redux'
            //"pouchdb",
            //"point-one"
        ]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            }
        ]
    },
    output: {
        path: path.join(__dirname, "public/js"),
        filename: "[name].pack.js"
    }
};