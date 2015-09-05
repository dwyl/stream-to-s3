var path  = require('path');
var example_image = path.resolve('example/_kitten-compressed.jpg');
var request = require('request');
var fs = require('fs');


require('env2')('config.env');
var S = require('../index.js');  // our module

console.log(' > > > > > ', process.env.ACL)

describe('Stream-Upload File To S3', function(){

  describe('Warm Up The Engine', function(){

    it('config.json file should exist', function(){
      // assert.equal(typeof CONFIG, 'object');
      assert.deepEqual(process.env.ACL, public-read);
    });

    it(example_image+' should exist', function(done){
      fs.stat(example_image, function(err, stat){
        if(err) console.log(err);
        assert.equal(stat.size, 439148);
        done();
      });
    });

  });

  describe('Upload a sample image', function(){

    it('Stream kitten to S3', function(done){
      S.streamFileToS3(example_image, function(err){
        if(err) console.log(err);
        console.log('      ✓ Uploaded',S.S3FileUrl(example_image));
        var url = S.S3FileUrl(example_image);
        var file2 = __dirname+'/kitten2.jpg';
        request(url)
        .pipe(fs.createWriteStream(file2)
          .on('finish',function(){
            fs.stat(file2, function(err, stat){
              if(err) console.log(err);
              console.log('      ✓ Download Complete',stat.size);
              assert.equal(stat.size, 439148);
              // console.log('DONE');
              done();
            });
          })
        );
        // check it actually worked:
      });
    });

  });
});
