'use strict';
const S3 = require('aws-sdk/clients/s3');
const BUCKET_NAME = process.env.BUCKET_NAME;
const s3 = new S3();

module.exports.getS3PreSignedUrl = async event => {
  try {
    const key = JSON.parse(event.body).key;
    const action = JSON.parse(event.body).action;
    const signedUrlExpireSeconds = 60 * 5;

    console.log("key:", key);
    console.log("action:", action);

    const url = s3.getSignedUrl(action, {
      Bucket: BUCKET_NAME,
      Key: key,
      Expires: signedUrlExpireSeconds
    });

    return {
      statusCode: 200,
      body: JSON.stringify(url),
    };
  } catch (e) {
    console.log(e);
  }
  
};
