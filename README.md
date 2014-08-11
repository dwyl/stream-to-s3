Stream Siles Amason S3 [![Build Status](https://travis-ci.org/nelsonic/stream-to-s3.png?branch=master)](https://travis-ci.org/nelsonic/stream-to-s3) [![Code Climate](https://codeclimate.com/github/nelsonic/stream-to-s3.png)](https://codeclimate.com/github/nelsonic/stream-to-s3) [![Dependencies](https://david-dm.org/nelsonic/stream-to-s3.png?theme=shields.io)](https://david-dm.org/nelsonic/stream-to-s3)
========================



Does exactly what the name says: a quick script to stream large files to Amazon S3 using node.js


## "It Cannot Be Done" (Challenge Accepted!)

According to
[this StackOverflow Q/A](http://stackoverflow.com/a/17326079/1148249)
stream-uploading large files to S3
is "not possible" because S3 requires the file-size up-front.
(i.e. before you can upload the file you need to tell S3 its size
  and since we are streaming the file in chunks we don't know
  its size before hand... or so the answer suggests.)

## The Solution

You do not need async to solve this problem.

Simply stream the (large) file, do what ever transformation you need and pipe the result directly to amazon S3 using [**Knox**](https://github.com/LearnBoost/knox)


## Tests! :open_mouth:

**Three steps** to running the test suite:

1. Install (Dev) Dependencies (Mocha etc.) <br/>
```sh
npm install
```

2. **Copy** the **config_example.json** file **to config.json**
and put your *real* Amazon S3 credentials in the config.json file:
```sh
cp config_example.json config.json  &&  atom config.json
```

3. Run ***real***tests using using the following command:
```sh
npm run realtest
```


***Note***: Because I don't want to make my S3 Keys ***Public***
(on GitHub), <br />
I've had to "fake" the `npm test` command for Travis.<br/>
But don't fear, there are tests and they are easy to run. <br/>
(and I don't encourage others to do the **exit 0** "hack" unless <br />
there's some sensitive config you don't want to open-source...)


. . .
transform the data in the stream how ever you need to and pipe the output to S3 using Knox putStream(). This is the true power of node.js

## Useful Links

Best place to learn Node.js Streams:
- SubStack's Streams Intro: [**github.com/substack/stream-handbook**](http://github.com/substack/stream-handbook)
- Max's stream intro: http://maxogden.com/node-streams.html
- http://ejohn.org/blog/node-js-stream-playground
- http://codewinds.com/blog/2013-08-04-nodejs-readable-streams.html


# To update
- [ ] http://stackoverflow.com/questions/25156716/how-to-apply-async-on-for-loop-of-range
- [ ] http://stackoverflow.com/questions/17309559/stream-uploading-file-to-s3-on-node-js-using-formidable-and-knox-or-aws-sdk
