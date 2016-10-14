const ipc = require('electron').ipcMain;
const dialog = require('electron').dialog;

ipc.on('open-file-dialog', function(event) {
  dialog.showOpenDialog({
    properties: ['openFile']
  }, function(files) {
    if (files) event.sender.send('selected-file', files)
  })
});

ipc.on('open-information-dialog', function(event, inputKey, inputEncryptFilePath) {
  inputKeyDisplay = (inputKey == "" ? "[Random]" : inputKey);
  inputEncryptFilePathDisplay = (inputEncryptFilePath == "" ? "[Random file name in same directory as selected file]" : inputEncryptFilePath);
  const options = {
    type: 'info',
    title: 'Information',
    message: "Please verify information below. Continue encryption?\nEncryption Key: " + inputKeyDisplay + "\nEncryption Location: " + inputEncryptFilePathDisplay,
    buttons: ['Yes', 'No']
  };
  dialog.showMessageBox(options, function(index) {
    event.sender.send('information-dialog-selection', index, inputKey, inputEncryptFilePath)
  })
});
