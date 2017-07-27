var mongoose = require('mongoose');

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
