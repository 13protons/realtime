var fs = require('fs');

module.exports = function(filename) {
  var writer = fs.createWriteStream(filename);
  var now = require("performance-now");
  return {
    write: write,
    close: close
  }

  function write(data) {
    var payload =  JSON.stringify({
      t: now(),
      d:data
    });
    writer.write(payload + '\n');
  }

  function close() {
    writer.end()
  }
}
