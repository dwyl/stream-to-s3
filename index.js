var file = 'your_file.txt'; // change this part

var fs = require('fs');     // node core filesystem module (KISS!)
var knox = require('knox'); // https://github.com/LearnBoost/knox

var CONFIG = require("./config.json");
var s3baseurl  = 'https://'+CONFIG.S3_BUCKET+'.s3.amazonaws.com/';

// initialise knox S3 client
var client = knox.createClient({
  key:    CONFIG.AWS_ACCESS_KEY_ID,
  secret: CONFIG.AWS_SECRET_ACCESS_KEY,
  bucket: CONFIG.S3_BUCKET,
  region: CONFIG.AWS_REGION
});

var S = {};

S.streamFile = function(file, callback) {

  // Amazon S3 needs to know the file-size before you can upload it
  fs.stat(file, function(err, stat){
    // Be sure to handle `err`.

    var req = client.put(file, {
      "Content-Length": stat.size,
      "Content-Type": "text/plain"
    });

    fs.createReadStream(file).pipe(req);


    req.on('response', function(res){
      // ...
    });
  });

  var stream = fs.createReadStream('directory/your_filename.txt');
  stream.pipe(res);

};

module.exports = S;
