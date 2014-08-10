Stream Siles Amason S3
========================

- [ ] update links before submit <br />

[![Build Status](https://travis-ci.org/nelsonic/time.png?branch=master)](https://travis-ci.org/nelsonic/time) [![Code Climate](https://codeclimate.com/github/nelsonic/time.png)](https://codeclimate.com/github/nelsonic/time) [![Dependencies](https://david-dm.org/nelsonic/time.png?theme=shields.io)](https://david-dm.org/nelsonic/time)


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
