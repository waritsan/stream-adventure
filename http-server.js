const through2 = require('through2');
const http = require('http');

function write(buffer, encoding, next) {
  this.push(buffer.toString().toUpperCase());
  next();
}

function end(done) {
  done();
}

var server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    req.pipe(through2(write, end)).pipe(res);
  }
});
server.listen(process.argv[2]);
