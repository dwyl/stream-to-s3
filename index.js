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

/**
 * S3FileUrl returns the full url of the file on S3 (helper method)
 * based on the AWS bucket environment/config variables
 * @param {String} file - the filename you are uploading to S3
 * @returns {String} - the public url for the file on S3
 */
var S3FileUrl = function(file) {
  var filename = file.split('/')[file.split('/').length-1];
  return 'https://'+process.env.S3BUCKET+'.s3.amazonaws.com/'+filename;
};

/**
 * streamFileToS3 our main method which uses Knox to stream the file to S3
 * @param {String} file - the file (of any type) to be uploaded (streamed) to S3
 * @param {Function} callback - the function to call when upload is complete
 *  callback function takes two parameters:
 *  @param {Object} err - an error object (or null)
 *  @param {String} url - the url for the file you just uploaded to S3
 */
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
