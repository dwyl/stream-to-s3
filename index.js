var file = 'your_file.txt'; // change this part

var fs = require('fs');     // node core filesystem module (KISS!)
var knox = require('knox'); // https://github.com/LearnBoost/knox

var config = JSON.parse(Assets.getText("config.json")),
s3baseurl  = 'https://'+config.S3_BUCKET+'.s3.amazonaws.com/',
acl        = { 'x-amz-acl': 'public-read' },
client     = knox.createClient({
  key:    config.AWS_ACCESS_KEY_ID,
  secret: config.AWS_SECRET_ACCESS_KEY,
  bucket: config.S3_BUCKET,
  region: config.AWS_REGION
});

// initialise knox S3 client
var client = knox.createClient({
  key: '<api-key-here>',
  secret: '<secret-here>',
  bucket: 'your-s3-bucket-name',
});


// Amazon S3 needs to know the file-size before you can upload it
fs.stat(file, function(err, stat){
  // Be sure to handle `err`.

  var req = client.put(file, {
      'Content-Length': stat.size
    , 'Content-Type': 'text/plain'
  });

  fs.createReadStream(file).pipe(req);


  req.on('response', function(res){
    // ...
  });
});

var stream = fs.createReadStream('directory/your_filename.txt');
stream.pipe(res);
