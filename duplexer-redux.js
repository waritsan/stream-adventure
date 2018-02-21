const duplexer2 = require('duplexer2');
const through2 = require('through2').obj;

module.exports = function (counter) {
  var counts = {};
  var input = through2(write, end);
  return duplexer2({objectMode: true}, input, counter);

  function write(row, _, next) {
    counts[row.country] = (counts[row.country] || 0) + 1;
    next();
  }

  function end(done) {
    counter.setCounts(counts);
    done();
  }
}
