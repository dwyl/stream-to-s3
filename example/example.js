var S = require('../index.js');

var file = __dirname+'/_kitten.jpg';
// console.log(__dirname);
var fs = require('fs');

fs.stat(file, function(err, stat){
  if(err) console.log(err);
  console.log(stat.size);
});


var mime = require('mime');

var type = mime.lookup(file);

console.log(type);

S.streamFileToS3(file, function(){
  console.log('Awesomeness', file, 'was uploaded!');
});


var request = require('request');
var url = S.S3FileUrl(file);

var file2 = 'example/kitten2.jpg';
request(url)
.pipe(fs.createWriteStream(file2)
  .on('finish',function(){
    fs.stat(file2, function(err, stat){
      if(err) console.log(err);
      console.log(stat.size);
      console.log('DONE');
    });
  })
);



var file = __dirname+'/world_map.jpg'; // any file format!
S.streamFileToS3(file, function(err) { // standard callback function:
  console.log(file,' Was uploaded. Visit:',S.S3FileUrl(file));
});
