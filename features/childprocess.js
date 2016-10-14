var child_process = require('child_process');

// app_location
exports.app_location;

// args is a json
exports.json_call = function(args, callback) {
  var proc = child_process.spawn(exports.app_location, [JSON.stringify(args)]);
  var result = "";
  proc.stdout.on('data', (data) => {
    result += data.toString()
  });

  proc.on('close', function(code) {
    if (code !== 0) {
      console.log(new Error("Process exited with non-zero status code"));
    } else {
      callback(result);
      console.log("Success");
    }
  });
};

// args need to be a list
exports.params_call = function(args, callback) {
  var proc = child_process.spawn(exports.app_location, args);
  var result = "";
  proc.stdout.on('data', (data) => {
    result += data.toString()
  });

  proc.on('close', function(code) {
    if (code !== 0) {
      console.log(new Error("Process exited with non-zero status code"));
    } else {
      callback(result);
      console.log("Success");
    }
  });
};
