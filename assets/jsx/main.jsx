var React = require("react");
var ReactDOM = require("react-dom");

// Render sidebar
var SideBar = require("./components/sidebar_components.jsx").SideBar;

ReactDOM.render(
    <SideBar />,
    document.getElementById('nav-sidebar')
);

