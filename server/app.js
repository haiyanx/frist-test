const path = require("path");
const helmet = require("helmet");
const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const compression = require("compression");

const routes = require("./routes");
const viewsPath = path.resolve(__dirname, "./views");
const publicPath = path.resolve(__dirname, "../dist/public");
const faviconPath = path.join(publicPath, "favicon.png")
const assetsPath = path.join(publicPath, "assets", "assets.json");

// init express.
const app = express();

// view engine setup.
app.set("views", viewsPath);
app.set("view engine", "pug");

// security setup.
app.use(helmet());

// gzip setup.压缩设置
app.use(compression());

// favicon setup.
app.use(favicon(faviconPath));

// body parser setup.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// static file setup.
app.use(express.static(publicPath));

if (app.get("env") === "production")
{
    // production: assets map setup.
    app.locals.map = require(assetsPath);
}
else
{
    // development: logger & HMR setup.
    const { blue } = require("chalk");
    console.log(blue("Current Environment:", "development"));

    const logger = require("morgan");
    app.use(logger("dev"));

    const webpack = require("webpack");
    const webpackDevMiddleware = require("webpack-dev-middleware");
    const webpackHotMiddleware = require("webpack-hot-middleware");
    const webpackDevConfig = require("../webpack.dev.config");
    const compiler = webpack(webpackDevConfig);
    const webpackDevMiddlewareInstance = webpackDevMiddleware(
        compiler,
        {
            stats:
            {
                chunks: false,
                colors: true
            },
            publicPath: webpackDevConfig.output.publicPath
        }
    );
    webpackDevMiddlewareInstance.waitUntilValid(() =>
    {
        // assets map setup.
        app.locals.map = require(assetsPath);
    });
    app.use(webpackDevMiddlewareInstance);
    app.use(webpackHotMiddleware(compiler));
}

// router setup.
app.use("/", routes);

// catch 404 and forward to global error handler.
app.use((req, res, next) =>
{
    const err = new Error("404 Not Found");
    err.status = 404;
    next(err);
});

// global error handler.
app.use((err, req, res, next) =>
{
    res.status(err.status || 500).send("Error 404");
});

module.exports = app;
