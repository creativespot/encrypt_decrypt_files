const ipc = require('electron').ipcRenderer;

const selectFileBtn = document.getElementById('select-file');
const selectedFileDisplay = document.getElementById('selected-file');
const inputKey = document.getElementById('key');
const inputEncryptFilePath = document.getElementById('encrypt_file_path');
const submitEncryptBtn = document.getElementById('submit-encrypt');

selectFileBtn.addEventListener('click', function(event) {
  ipc.send('open-file-dialog')
});

ipc.on('selected-file', function(event, path) {
  selectedFileDisplay.innerHTML = `You selected: ${path}`
});



submitEncryptBtn.addEventListener('click', function(event) {
  ipc.send('open-information-dialog', inputKey.value, inputEncryptFilePath.value)
});

ipc.on('information-dialog-selection', function(event, index) {
  let message = 'You selected ';
  if (index === 0) message += 'yes.';
  else message += 'no.';
  document.getElementById('info-selection').innerHTML = message
});
