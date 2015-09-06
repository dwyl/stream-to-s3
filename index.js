var file = 'your_file.txt'; // change this part

var fs = require('fs');     // node core filesystem module
var knox = require('knox'); // https://github.com/LearnBoost/knox
var mime = require('mime'); // https://github.com/broofa/node-mime

// initialise knox S3 client
var client = knox.createClient({
  key:    process.env.AWSAccessKeyId,
  secret: process.env.AWSSecretKey,
  bucket: process.env.S3BUCKET,
  region: process.env.AWSREGION
});

var S3FileUrl = function(file) {
  var filename = file.split('/')[file.split('/').length-1];
  return 'https://'+process.env.S3BUCKET+'.s3.amazonaws.com/'+filename;
};

var streamFileToS3 = function(file, callback) {
  // Amazon S3 needs to know the file-size before you can upload it
  fs.stat(file, function(err, stat){
    /* istanbul ignore if */
    if(err) {
      return console.log('S3 Uploda ERROR',err);
    }

    var type = mime.lookup(file);

    var headers = {
    'Content-Length': stat.size,
    'Content-Type': type,
    "x-amz-acl": process.env.ACL
    };
    var filename = file.split('/')[file.split('/').length-1];
    // console.log(filename);
    var fileStream = fs.createReadStream(file);
    client.putStream(fileStream, filename, headers, function (err, res) {
      /* istanbul ignore if */
      if(err) {
        console.log('ERROR',err);
      }
      var url = S3FileUrl(file)
      callback(err, url);
    });
  }); // end fs.stat
};

module.exports = streamFileToS3;
module.exports.S3FileUrl = S3FileUrl;
