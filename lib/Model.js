var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.createConnection('mongodb://localhost:27017/BIMFace');
var ModelSchema = mongoose.Schema({
    //'modelName': String,
    'modelId': String,
    'modelType': String,
    'allow': String
});

var Model = mongoose.model('model', ModelSchema);

module.exports.getModelsByAllow = function(allow){
    return Model.find({
        'allow': allow
    }).exec().then(function(models){
        if (models === null) return Promise.resolve([]);
        return Promise.resolve(models);
    }).catch(function(err){
        console.log(err);
        return Promise.resolve([]);
    });
};