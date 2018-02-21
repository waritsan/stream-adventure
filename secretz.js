const tar = require('tar');
const crypto = require('crypto');
const zlib = require('zlib');
const concat = require('concat-stream');

var parser = new tar.Parse();
parser.on('entry', function (e) {
  if (e.type !== 'File') return e.resume();
  var h = crypto.createHash('md5', { encoding: 'hex' });
  e.pipe(h).pipe(concat(function (hash) {
    console.log(hash + ' ' + e.path);
  }));
});

var cipher = process.argv[2];
var pw = process.argv[3];
process.stdin
  .pipe(crypto.createDecipher(cipher, pw))
  .pipe(zlib.createGunzip())
  .pipe(parser)
;
