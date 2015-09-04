var file = 'your_file.txt'; // change this part

var fs = require('fs');     // node core filesystem module
var knox = require('knox'); // https://github.com/LearnBoost/knox
var mime = require('mime'); // https://github.com/broofa/node-mime

// require('env2')('config.env');

var S = {};

// initialise knox S3 client
S.client = knox.createClient({
  key:    process.env.AWSAccessKeyId,
  secret: process.env.AWSSecretKey,
  bucket: process.env.S3BUCKET,
  region: process.env.AWSREGION
});

S.S3FileUrl = function(file) {
  var filename = file.split('/')[file.split('/').length-1];
  return 'https://'+process.env.S3BUCKET+'.s3.amazonaws.com/'+filename;
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
