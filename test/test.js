var path    = require('path');
var image   = path.resolve('example/_kitten-compressed.jpg');
var request = require('request');
var fs      = require('fs');
var test    = require('tape');
require('env2')('config.env');
// console.log(process.env);
var S = require('../index.js');  // our module

test('Warm Up The Engine', function(t){
  t.ok(process.env.ACL, 'public-read');
  fs.stat(image, function(err, stat){
    if(err) console.log(err);
    console.log(stat.size);
    t.equal(stat.size, 52159);
    t.end();
  });
});

test('Upload a sample image', function(t){
  S.streamFileToS3(image, function(err){
    if(err) console.log(err);
    console.log('      ✓ Uploaded',S.S3FileUrl(image));
    var url = S.S3FileUrl(image);
    var file2 = __dirname+'/kitten2.jpg';
    request(url)
    .pipe(fs.createWriteStream(file2)
      .on('finish',function(){
        fs.stat(file2, function(err, stat){
          if(err) console.log(err);
          console.log('      ✓ Download Complete',stat.size);
          t.equal(stat.size, 52159);
          t.end();
        });
      })
    );
  });
});
