var fs = require('fs');
var wstream;
var now = require("performance-now")
var start = now()
var begin = process.hrtime();

var totalIterations = 1000;
var iterations = 0;

openStream();
addData(process.hrtime());

function openStream() {
  wstream = fs.createWriteStream('testData.json');
  wstream.write('[\n');
}
function closeStream() {
  console.log('all done after', now());
  var data = JSON.stringify({
    pos: 0,
    data: {}
  });
  wstream.write(data + ']\n');
  wstream.end();
}

function addData(ts){
  var data = JSON.stringify({
    wait: hrToMills(process.hrtime(ts)),
    data: fabricatePayload()
  });
  wstream.write(data + ',\n');

  iterations++;
  if (iterations < totalIterations) {
    var currently = process.hrtime();
    setTimeout(function(){
      addData(currently)
    }, parseInt(Math.random() * 30))
  } else {
    closeStream()
  }
}


var reportInt;
reportInt = setInterval(function report() {
  console.log(iterations + '/' + totalIterations, ': ', friendlyBytes(wstream.bytesWritten) + ' written after', process.hrtime(begin)[0] + 's');
  if (iterations >= totalIterations) {
    clearInterval(reportInt);
    console.log('--- end reporting ---');
  }
}, 1000)

function friendlyBytes(bytes) {
  var kb = 1024;
  var mb = 1048576;
  if (bytes > 750000) {
    return (bytes/mb).toFixed(2) + 'mb';
  }
  return (bytes/kb).toFixed(0) + 'kb';

}

function hrToMills(ts) {
  var nano = ts[0] * 1e9 + ts[1]
  var ms = nano / 1e+6;
  return parseInt(ms.toFixed(0));
}

function fabricatePayload() {
  return {
    key_10: parseInt(Math.random() * 40),
    key_11: parseInt(Math.random() * 6000),
    key_12: 234567,
    key_13: 234567,
    key_14: parseInt(Math.random() * 100),
    key_15: parseInt(Math.random() * 100),
  }
}
