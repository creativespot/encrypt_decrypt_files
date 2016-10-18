const React = require("react");
const ChangePageTo = require("./../pages.jsx").ChangePageTo;

var SideBar = React.createClass({
    getInitialState: function () {
        return {
            data: [
                {"name":"file_list", "icon": "am-icon-table", "text": "File List"},
                {"name":"encrypt_file", "icon": "am-icon-pencil-square-o", "text": "Encrypt File"},
                {"name":"settings", "icon": "am-icon-cog", "text": "Settings"},
                {"name":"logout", "icon": "am-icon-sign-out", "text": "Logout"}
            ]
        };
    },
    render: function () {
        return (
            <div id="admin-offcanvas">
                <div className="am-offcanvas-bar admin-offcanvas-bar">
                    <NavList data={this.state.data}/>
                    <SidebarPanel icon="am-icon-bookmark" title="公告" text="时光静好，与君语；细水流年，与君同。—— Amaze UI" />
                    <SidebarPanel icon="am-icon-tag" title="wiki" text="Welcome to the Amaze UI wiki!" />
                </div>
            </div>
        );
    }
});

exports.SideBar = SideBar;

var NavList = React.createClass({
    render: function () {
        var counter = 0;
        var navNodes = this.props.data.map(function (item) {
            counter++;
            return (
                <NavItem key={"menu-item-"+counter} item={item} />
            );
        });
        return (
            <ul className="am-list admin-sidebar-list">
                {navNodes}
            </ul>
        );
    }
});

var NavItem = React.createClass({
    handleNavChange: function() {
        ChangePageTo(this.props.item.name)
    },
    render: function () {
        return (
            <li><a onClick={this.handleNavChange}><IconElement data={this.props.item.icon}/> {this.props.item.text}</a></li>
        );
    }
});

var IconElement = React.createClass({
    render: function () {
        return (
            <span className={this.props.data}/>
        );
    }
});

var SidebarPanel = React.createClass({
    render: function(){
        return (
            <div className="am-panel am-panel-default admin-sidebar-panel">
                <div className="am-panel-bd">
                    <p><IconElement data={this.props.icon} /> {this.props.title}</p>
                    <p>{this.props.text}</p>
                </div>
            </div>
        )
    }
});
