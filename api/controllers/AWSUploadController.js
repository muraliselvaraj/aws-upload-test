/**
 * AWSUploadController
 *
 * @description :: Server-side logic for managing Awsuploads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	uploadTest: function(req, res){
		var opts = req.body;

		var uploadData = {
			data: opts.data,
			folder: 'iamrole-test',
			ext: 'png',
			name: opts.name
		};

		AWSService.upload(uploadData, function(err, response){
			if(err){
				console.log('error == ', err);
				return res.negotiate(err);
			} else {
				console.log('response == ', response);
				return res.json(response);
			}
		});
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

