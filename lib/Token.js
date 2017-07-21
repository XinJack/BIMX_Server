var axios = require('axios');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.createConnection('mongodb://localhost:27017/BIMFace');
var TokenSchema = mongoose.Schema({
    'token': String,
    'data': {
        'expireTime': String,
        'token': String
    }
});

var Token = mongoose.model('token', TokenSchema);

module.exports.getAccessTokenFromAPI = function(){
    var authorization = 'Basic ' + new Buffer('0qpeUVEHIMrtiTpH7j46ocICxMjjdINQ:QjXw8zU9qbfLDDCfmfzxmHGUTngA7nqT').toString('base64');
    var instance = axios.create({
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/json'
        }
    });
    return instance.post('https://api.bimface.com/oauth2/token')
        .then(function(response){
        return Promise.resolve(response.data.data);
    }).catch(function(err){
        console.log(err);
        return Promise.resolve(null);
    })
};

module.exports.getAccessToken = function(){
    var self = this;
    return Token.findOne({
        'token': 'accessToken'
    }).exec().then(function(token){
        if(token === null) {
            return self.getAccessTokenFromAPI()
                .then(function(data){
                    var token = new Token({
                        'token': 'accessToken',
                        'data': data
                    });
                    return token.save()
                        .then(function(token){
                            return Promise.resolve(data['token']);
                        }).catch(function(err){
                            console.log(err);
                            return Promise.resolve(data['token']);
                        })
                }).catch(function(err){
                    console.log(err);
                    return Promise.resolve('');
            });
        }
        else{
            var expireTime = token['data']['expireTime'];
            expireTime = expireTime.replace('T', ' ').replace(/-/g, '/');
            if(new Date(expireTime).getMilliseconds() >= new Date().getMilliseconds()){
                return Promise.resolve(token['data']['token']);
            }else{
                return self.getAccessTokenFromAPI()
                    .then(function(data){
                        return Token.findOneAndUpdate({
                            'token': 'accessToken'
                        }, {
                            'token': 'accessToken',
                            'data': data
                        }).exec().then(function(token){
                            return Promise.resolve(token['data']['token']);
                        }).catch(function(err){
                            console.log(err);
                            return Promise.resolve(data['token']);
                        })
                    }).catch(function(err){
                    console.log(err);
                    return Promise.resolve('');
                });
            }
        }
    }).catch(function(err){
        console.log(err);
        return Promise.resolve('');
    });
};

module.exports.getViewToken = function(modelId, modelType) {
    var self = this;
    if(modelType === 'normal'){
        params = {
            'fileId': modelId
        }
    }
    else if(modelType === 'integrate') {
        params = {
            'integrateId': modelId
        }
    } else{
        params = {}
    }
    return self.getAccessToken()
        .then(function(token){
            if(token === ''){
                return Promise.resolve('')
            }
            var instance = axios.create({
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Content-Type': 'application/json'
                }
            });
            return instance.get('https://api.bimface.com/view/token', {
                'params': params
            }).then(function(response){
                if(response.data.code === 'success'){
                    return Promise.resolve(response.data.data);
                }
                return Promise.resolve('');
            }).catch(function(err){
                console.log(err);
                return Promise.resolve('');
            });
        });
};