var writer = require('./lib/writer.js');
var ingest = writer('data.raw');

var max = 100;
var index = 0;
addData();
function addData(){
  index++;
  if (index < max) {
    setTimeout(function(){
      ingest.write(fabricatePayload())
      addData()
    }, parseInt(Math.random() * 30))
  } else {
    ingest.close()
  }
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
