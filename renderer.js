const remote = require('electron').remote;

// minimize, maximize, close
document.getElementById("main-min-btn").addEventListener("click", function (e) {
    var window = remote.getCurrentWindow();
    window.minimize();
});

document.getElementById("main-max-btn").addEventListener("click", function (e) {
    var window = remote.getCurrentWindow();
    if (!window.isMaximized()) {
        window.maximize();
    } else {
        window.unmaximize();
    }
});

document.getElementById("main-close-btn").addEventListener("click", function (e) {
    var window = remote.getCurrentWindow();
    window.close();
});


