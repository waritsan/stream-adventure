const through2 = require('through2');
const split = require('split');

var lineNumber = 1;
var string;

process.stdin.pipe(split()).pipe(through2(function (line, _, next) {
  if (lineNumber % 2 == 0) {
    string = line.toString().toUpperCase();
  } else {
    string = line.toString().toLowerCase();
  }
  console.log(string);
  lineNumber++;
  next();
})).pipe(process.stdout);
