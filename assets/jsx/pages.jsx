var React = require("react");
var ReactDOM = require("react-dom");

// register pages
var Pages = function(id){
    if (id == 'file_list'){
        // fn();
        var Page = require("./pages/file_list_page.jsx").FileListPage
    }

    ReactDOM.render(
        <Page />,
        document.getElementById('main')
    );
};


exports.ChangePageTo = Pages;