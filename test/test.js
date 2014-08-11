var example_image = '';

var chai = require('chai');
var assert = chai.assert;
var S = require('../index.js');  // our module
var CONFIG = require('../config.json');
// console.log(CONFIG);

describe('Stream-Upload File To S3', function(){

  // config_example.json file exists
  describe('Warm Up The Engine', function(){

    it('config.json file should exist', function(){
      assert.equal(typeof CONFIG, 'object');
      assert.deepEqual(CONFIG.ACL, {"x-amz-acl": "public-read"});
    });

  });
});
