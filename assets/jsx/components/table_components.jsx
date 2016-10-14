const React = require("react");

const {DropdownElement, BadgeElement} = require("./common_page_components.jsx");

var TableElement = React.createClass({
    render: function () {
        return (
            <table className="am-table am-table-bd am-table-striped admin-content-table am-table-hover table-main">
                <TableHeader data={this.props.header} />
                <TableBody data={this.props.items} />
            </table>

        );
    }
});

exports.TableElement = TableElement;

var TableHeader = React.createClass({
    render: function () {
        console.log(this.props.data);
        var counter = 0;
        var thNodes = this.props.data.map(function (item) {
            counter++;
            return (
                <th key={"header-" + counter}>{item}</th>
            );
        });
        return (
            <thead>
            <tr>{thNodes}</tr>
            </thead>
        );
    }
});

var TableBody = React.createClass({
    render: function () {
        var counter = 0;
        var rowNodes = "";
        if (this.props.hasOwnProperty("data") && this.props.data.length > 0){
            rowNodes = this.props.data.map(function (item) {
                counter++;
                return (
                    <TableRow key={"table-row-" + counter} data={item}/>
                );
            });
        }
        return (
            <tbody>{rowNodes}</tbody>
        );
    }
});

var TableRow = React.createClass({
    render: function () {
        var counter = 0;
        var cellNodes = this.props.data.map(function (item) {
            counter++;
            return (
                <TableCell key={"table-cell-" + counter} data={item}/>
            );
        });
        return (
            <tr>{cellNodes}</tr>
        );
    }
});

var TableCell = React.createClass({
    render: function () {
        if (this.props.data.hasOwnProperty("ahref")) {
            if (this.props.data.hasOwnProperty("badge")) {
                return (
                    <td><a href={this.props.data.ahref}><BadgeElement data={this.props.data}/></a></td>
                );
            } else {
                return (
                    <td><a href={this.props.data.ahref}>{this.props.data.text}</a></td>
                );
            }
        } else if (this.props.data.hasOwnProperty("badge")) {
            return (
                <td><BadgeElement data={this.props.data}/></td>
            );
        } else if (this.props.data.hasOwnProperty("dropdownItems")) {
            return (
                <td><DropdownElement data={this.props.data}/></td>
            );
        } else {
            return (
                <td>{this.props.data.text}</td>
            );
        }
    }
});
