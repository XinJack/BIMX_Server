var mongoose = require('mongoose');

var VideoSchema = mongoose.Schema({
    'modelId': String,
    'objectId': String,
    'playerOptions': Object
});

var Video = mongoose.model('video', VideoSchema);

module.exports.getPlayerOptions = function(modelId, objectId){
    return Video.findOne({
        'modelId': modelId,
        'objectId': objectId
    }).exec().then(function(player){
        if(player === null) return Promise.resolve({});
        return Promise.resolve(player.playerOptions);
    }).catch(function(err){
        console.log(err);
        return Promise.resolve({});
    })
};