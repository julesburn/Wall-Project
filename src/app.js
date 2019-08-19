const appConfig = require("./config/main-config.js");
const express = require("express");
const app = express();
const routeConfig = require("./config/route-config.js");

appConfig.init(app, express);
routeConfig.init(app);

module.exports = app;