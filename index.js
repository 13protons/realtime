var start = process.hrtime();
var beforeMem = process.memoryUsage();
var now = require("performance-now");

var fileToPlayback = require('./testData.json');
var max = fileToPlayback.length;

var totalTime = fileToPlayback.reduce(function(acc, item){
  console.log(acc, item.wait)
  return acc + (item.wait || 0);
}, 0)
console.log('should take', totalTime + 'ms');

play(0);

function play(index) {
  if (index >= max) {
    end();
    return;
  }
  var current = fileToPlayback[index];
  console.log(index + '/' + max + ': speed = ' + current.data.key_10, 'after', now());
  setTimeout(function(){
    play(index+1);
  }, current.wait);
}

var afterMem = process.memoryUsage()
var elapsed = process.hrtime(start);

console.log('memory delta:', beforeMem, afterMem);
console.log('Please wait for final memory report...');

function end() {
  console.log('memory after all timers have expired', process.memoryUsage())
}
