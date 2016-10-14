const React = require("react");

const {Dropdown, ButtonToolbar, ButtonGroup, Button} = require("amazeui-react");

var PageTitleBar = React.createClass({
    render: function () {
        let paddingClass = "";
        if (this.props.PaddingBottomZero == "yes") {
            paddingClass = " am-padding-bottom-0"
        }
        return (
            <div className={"am-cf am-padding"+paddingClass}>
                <div className="am-fl am-cf"><strong className="am-text-primary am-text-lg">{this.props.title}</strong> {this.props.separator} <small>{this.props.description}</small></div>
            </div>
        );
    }
});

exports.PageTitleBar = PageTitleBar;

var IconElement = React.createClass({
    render: function () {
        return (
            <span className={this.props.data}/>
        );
    }
});

exports.IconElement = IconElement;

var BadgeElement = React.createClass({
    render: function () {
        return (
            <span className={"am-badge " + this.props.data.badge}>{this.props.data.text}</span>
        );
    }
});

exports.BadgeElement = BadgeElement;

var DropdownElement = React.createClass({
    render: function () {
        var title;
        if (this.props.data.hasOwnProperty('dropdownIcon')){
            title = React.createElement('span', {className:this.props.data.dropdownIcon},"");
        } else {
            title = this.props.data.dropdownText;
        }

        var counter = 0;
        var dropdownNodes = this.props.data.dropdownItems.map(function (item) {
            counter++;
            return (
                <Dropdown.Item header key={"dropdown-item-" + counter}><a href="test">{item}</a></Dropdown.Item>
            );
        });

        return (
            <Dropdown btnSize="xs" title={title}>
                {dropdownNodes}
            </Dropdown>
        )
    }
});

exports.DropdownElement = DropdownElement;

// var ButtonGroups = React.createClass({
//    render:
// });