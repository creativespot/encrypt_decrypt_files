//load css
require("./css/amazeui.css");
require("./css/admin.css");
require("./css/nativize.css");
require("./css/app.css");


// load js files
const React = require('react');
require("./jsx/main.jsx");
window.jQuery = window.$ = require("./js/jquery.min.js");
window.$.AMUI = require("./js/amazeui");
require("./js/app.js");
require('../renderer.js');
