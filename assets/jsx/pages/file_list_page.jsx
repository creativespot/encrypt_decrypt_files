var React = require("react");
var PageTitleBar = require('../components/common_page_components.jsx').PageTitleBar;
var TableElement = require('../components/table_components.jsx').TableElement;
const ipc = require('electron').ipcRenderer;

var FileListPage = React.createClass({
    getInitialState: function () {
        return {
            header: [
                "File Path",
                "Encrypt File Name"
            ],
            items: [
                // [{'text':'John Clark'},{'text':'Business management','ahref':'#'}, {'text':'+20','badge':'am-badge-success','ahref':'#'},{'dropdownIcon':'am-icon-cog','dropdownItems':['1. 编辑','2. 下载','3. 删除']}],
                // [{'text':'John Clark'},{'text':'Business management','ahref':'#'}, {'text':'-10','badge':'am-badge-danger'},{'dropdownText':'hmm','dropdownItems':['1. 编辑','2. 下载','3. 删除']}]
            ]
        };
    },
    componentDidMount: function () {
        ipc.send('update-file-list');
        ipc.on('file-list', function (event, path) {
            document.getElementById('file-list').innerHTML = `You selected: ${path}`
        });
    },
    render: function () {
        return (
            <div className="admin-content-body">
                <p id="file-list">n/a</p>
                <PageTitleBar />
                <div className="am-g">
                    <div className="am-u-sm-12">
                        <TableElement header={this.state.header} items={this.state.items} />
                    </div>
                </div>
            </div>
        );
    }
});

exports.FileListPage = FileListPage;
