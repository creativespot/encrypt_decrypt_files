const electron = require('electron');
const child = require('../features/childprocess.js');
const shell = electron.shell;
const fs = require('fs');
const path = require('path');
const ipc = require('electron').ipcMain;

ipc.on('update-file-list', function(event) {
    let msg = "";
    child.app_location = "./logic/encrypt_decrypt_files.exe";
    msg = "<table><tr><th>Original File Path</th><th>Encrypted File Name</th><th>Operations</th></tr>";
    child.params_call(["-operation=list"], function (data) {
        data = JSON.parse(data);
        let itemsProcessed = 0;
        if (data && data.length > 0) {
            data.forEach(function (obj) {
                msg = msg + "<tr><td>" + obj.OriginalFilePath + "</td><td>" + obj.EncryptFileName + "</td><td><a href=\"#\" onClick=\"decryptBtn_click(1)\">Decrypt</a></td></tr>";
                itemsProcessed++;
                if (itemsProcessed === data.length) {
                    msg = msg + "</table>";
                    event.sender.send('file-list', msg)
                }
            });
        } else{
            event.sender.send('file-list', "blank")
        }

    });
});
