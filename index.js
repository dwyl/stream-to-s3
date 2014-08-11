var file = 'your_file.txt'; // change this part

var fs = require('fs');     // node core filesystem module (KISS!)
var knox = require('knox'); // https://github.com/LearnBoost/knox
var mime = require('mime'); // https://github.com/broofa/node-mime

var CONFIG = require("./config.json");

var S = {};

// initialise knox S3 client
S.client = knox.createClient({
  key:    CONFIG.AWS_ACCESS_KEY_ID,
  secret: CONFIG.AWS_SECRET_ACCESS_KEY,
  bucket: CONFIG.S3_BUCKET,
  region: CONFIG.AWS_REGION
});

S.S3FileUrl = function(file) {
  var filename = file.split('/')[file.split('/').length-1];
  return 'https://'+CONFIG.S3_BUCKET+'.s3.amazonaws.com/'+filename;
};

S.streamFileToS3 = function(file, callback) {

  // Amazon S3 needs to know the file-size before you can upload it
  fs.stat(file, function(err, stat){
    /* istanbul ignore if */
    if(err) {
      return console.log('ERROR',err);
    }

    var type = mime.lookup(file);

    var headers = {
    'Content-Length': stat.size,
    'Content-Type': type,
    "x-amz-acl": "public-read"
    };
    var filename = file.split('/')[file.split('/').length-1];
    // console.log(filename);
    var fileStream = fs.createReadStream(file);
    S.client.putStream(fileStream, filename, headers, function (err, res) {
      /* istanbul ignore if */
      if(err) {
        console.log('ERROR',err);
      }
      callback(err);
    });
  }); // end fs.stat
};

module.exports = S;
