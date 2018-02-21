const through2 = require('through2');
const trumpet = require('trumpet');

var tr = trumpet();
var loud = tr.select('.loud').createStream();

loud.pipe(through2(function (buf, _, next) {
  this.push(buf.toString().toUpperCase());
  next();
})).pipe(loud);

process.stdin.pipe(tr).pipe(process.stdout);
