﻿const path = require("path");
const webpack = require("webpack");
const AssetsPlugin = require("assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const srcPath = path.resolve(__dirname, "./client/todo");
const distPath = path.resolve(__dirname, "./dist/public/assets");

module.exports = {
    context: srcPath,
    entry:
    {
        vendor: ["./common/vendor"],
        index: ["./index"]
    },
    output:
    {
        path: distPath,
        publicPath: "/assets/",
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },
    resolve:
    {
        extensions: ["", ".js", ".jsx"]
    },
    module:
    {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ["babel"]
            },
            {
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                loader: "url?limit=10000&name=res/[name].[ext]"
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url?limit=10000&mimetype=application/font-woff&name=res/[name].[ext]"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file?limit=10000&name=res/[name].[ext]"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([distPath]),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity
        }),
        new AssetsPlugin({
            filename: "assets.json",
            path: distPath,
            prettyPrint: true
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};
