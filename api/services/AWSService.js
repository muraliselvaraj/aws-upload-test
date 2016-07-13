var fs = require('fs');
var AWS = require('aws-sdk');

var bucket = 'topiciq-dev';

// AWS.config.update({
//     accessKeyId: process.env.TOPICIQ_AWS_ACCESS_KEY,
//     secretAccessKey: process.env.TOPICIQ_AWS_SECRET_ACCESS_KEY
// });

var s3 = new AWS.S3();

exports.upload = function (doc, cb) {
    var uploader = function (params) {
        s3.putObject(params, function (err, res) {
            if (err) {
                sails.config.globals.logger.error("Error uploading data: ", err);
                cb(err);
            } else {
                cb(null, res);
            }
        });
    };
    var key = (doc.folder && doc.folder != '') ? doc.folder + '/' + doc.name : doc.name;
    if(doc.path){
        fs.readFile(doc.path, function (err, file_buffer) {
            var params = {
                "Bucket": bucket,
                "Key": key,
                "Body": file_buffer,
                "ServerSideEncryption": "AES256",
                "ContentType": doc.ext
            };
            uploader(params);
        });
    }else{
        var params = {
            "Bucket": bucket,
            "Key": key,
            "Body": doc.data,
            "ServerSideEncryption": "AES256",
            "ContentType": doc.ext
        };
        uploader(params);
    }
},

exports.delete = function(resource, cb){
    var params = {
        Bucket: bucket,
        Key: resource
    };
    s3.deleteObject(params, function(err, data){
        if(err){
            sails.config.globals.logger.error(err);
            return cb(err);
        } else{
            sails.config.globals.logger.debug(data);
            return cb(null, data);
        }
    });
}