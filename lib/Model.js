var mongoose = require('mongoose');

var ModelSchema = mongoose.Schema({
    // 'modelName': String,
    'modelId': String,
    'modelType': String,
    'ownedBy': Array
});

var Model = mongoose.model('model', ModelSchema);

// 根据模型的所属权获取模型
module.exports.getModelsByOwner = function(owner){
    return Model.find({"ownedBy": owner}).exec().then(function(models){
        if(models === null) return Promise.resolve([]);
        return Promise.resolve(models);
    }).catch(function(err){
        console.log(err);
        return Promise.resolve([]);
    });
};