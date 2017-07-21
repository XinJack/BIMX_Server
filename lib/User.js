var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017/BIMFace');

var UserSchema = mongoose.Schema({
    'username': String,
    'password': String
});

var User = mongoose.model('user', UserSchema);

module.exports.validateUser = function(username, password) {
    return User.findOne({
        'username': username
    }).exec().then(function(user){
        if(user === null) return Promise.resolve(false);
        if(user.password === password) return Promise.resolve(true);
        return Promise.resolve(false);
    }).catch(function(err){
        console.log(err);
        return Promise.resolve(false);
    });
};
