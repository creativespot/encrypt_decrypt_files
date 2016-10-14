const electron = require('electron');
const desktopCapturer = electron.desktopCapturer;
const electronScreen = electron.screen;
const shell = electron.shell;

const fs = require('fs');
const os = require('os');
const path = require('path');

exports.Capture = function(options, callback) {
  if (!('savePath' in options)) options['savePath'] = null;
  if (!('fileName' in options)) options['fileName'] = null;
  if (!('windowObj' in options)) options['windowObj'] = null;
  if (!('openAfterSave' in options)) options['openAfterSave'] = null;

  const thumbSize = determineScreenShotSize(options['windowObj']);
  let source_options = {
    types: ['window', 'screen'],
    thumbnailSize: thumbSize
  };

  desktopCapturer.getSources(source_options, function(error, sources) {
    if (error) return console.log(error);

    sources.forEach(function(source) {
      if (determineCaptureSource(source, options['windowObj'])) {
        const screenshotPath = determineSavePath(options['savePath'], options['fileName']);

        fs.writeFile(screenshotPath, source.thumbnail.toPng(), function(error) {
          if (error) return console.log(error);
          if (options['openAfterSave']) shell.openExternal('file://' + screenshotPath);
          callback(screenshotPath)
        })
      }
    })
  })
};

function determineCaptureSource(source, windowObj) {
  if (windowObj == null) {
    if (source.name === 'Entire screen' || source.name === 'Screen 1') {
      return true
    } else {
      return false
    }
  } else {
    if (source.name === windowObj.getTitle()) {
      return true
    } else {
      return false
    }
  }
}

function determineScreenShotSize(windowObj) {
  if (windowObj == null) {
    const screenSize = electronScreen.getPrimaryDisplay().workAreaSize;
    const maxDimension = Math.max(screenSize.width, screenSize.height);
    return {
      width: maxDimension * window.devicePixelRatio,
      height: maxDimension * window.devicePixelRatio
    }
  } else {
    let winbound = windowObj.getBounds();
    return {
      width: winbound.width,
      height: winbound.height
    }
  }
}

function determineSavePath(savePath, fileName) {
  if (savePath == null) {
    savePath = os.tmpdir()
  }
  if (fileName == null) {
    fileName = 'screenshot.png'
  }
  return path.join(savePath, fileName)
}
