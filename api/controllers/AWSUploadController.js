/**
 * AWSUploadController
 *
 * @description :: Server-side logic for managing Awsuploads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs');
module.exports = {
	
	uploadTest: function(req, res){
		var opts = req.body;

		var uploadData = {
			data: opts.data,
			folder: 'iamrole-test',
			ext: 'png',
			name: opts.name
		};

		if(opts && opts.data){
			uploadData.data = opts.data;
			uploadData.folder = 'iamrole-test';
			uploadData.ext = 'png';
			uploadData.name = Math.floor(Date.now());
			startUpload();
		} else {
			var FolderPath = process.env['HOME']+'/upload-test';
			if(!fs.existsSync(FolderPath)){
	            fs.mkdirSync(FolderPath);
	        }
			var fileName = FolderPath +'/'+ Math.floor(Date.now()) + '.json';
			var content = {message: 'Test s3 upload'};
			content = JSON.stringify(content);
	        fs.writeFile(fileName, content, function(err, data) {
	            if(err){
	                return res.negotiate(err);
	            } else {
	            	uploadData.path = fileName;
					uploadData.folder = 'iamrole-test';
					uploadData.ext = 'json';
					uploadData.name = Math.floor(Date.now());
	                startUpload();
	            }
	        });
		}

		function startUpload(){
			AWSService.upload(uploadData, function(err, response){
				if(err){
					console.log('error == ', err);
					return res.negotiate(err);
				} else {
					console.log('response == ', response);
					return res.json(response);
				}
			});
		}
	},

	deleteTest: function(req, res){
		var opts = req.body;

		var deleteData = 'iamrole-test/'+opts.name;

		AWSService.delete(deleteData, function(err, response){
			if(err){
				console.log('error == ', err);
				return res.negotiate(err);
			} else {
				console.log('response == ', response);
				return res.json(response);
			}
		});
	}

};

