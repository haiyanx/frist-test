const webpack = require("webpack");
const config = require("./webpack.base.config");

config.module.preLoaders = [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint"
    }
];

config.module.loaders.push(
    {
        test: /\.css$/,
        loaders: ["style", "css"]
    },
    {
        test: /\.less$/,
        loaders: ["style", "css", "less"]
    }
);

config.plugins.push(
    new webpack.SourceMapDevToolPlugin({
        filename: "[file].map",
        exclude: ["vendor.js"]
    })
);

// HMR.
config.module.loaders[0].loaders.unshift("react-hot");
for (const key of Object.keys(config.entry))
{
    config.entry[key].push("webpack-hot-middleware/client?reload=true");
}
config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
);

module.exports = config;
