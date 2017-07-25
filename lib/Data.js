var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.createConnection('mongodb://localhost:27017/BIMFace');

var DataSchema = mongoose.Schema({
	modelId: String,
	objectId: String,
	type: String,
	option: Object
});

var Data = mongoose.model('data', DataSchema);

module.exports.getEChartOption = function(modelId, objectId, type){
	return Data.findOne({
		'modelId': modelId,
		'objectId': objectId,
		'type': type
	}).exec().then(function(data){
		if(data === null) return Promise.resolve({});
		return Promise.resolve(data.option);
	}).catch(function(err){
		console.log(err);
		return Promise.resolve({});
	});
}