var express = require('express');
var router = express.Router();

var Model = require('../lib/Model.js');
var Token = require('../lib/Token.js');
var Video = require('../lib/Video.js');
var Data = require('../lib/Data.js');

router.get('/models', function(req, res){
  Model.getModelsByOwner(req.session.loginRole)
    .then(function(models){
        res.json({
            'code': 'success',
            'data': models
        });
    }).catch(function(err){
        console.log(err);
        res.json({
            'code': 'error',
            'data': []
        });
    });
});

router.get('/viewToken', function(req, res){
    var modelId = req.query.modelId;
    var modelType = req.query.modelType;
    Token.getViewToken(modelId, modelType)
        .then(function(token){
            if(token !== ''){
                res.json({
                    'code': 'success',
                    'data': token
                });
            }else{
                res.json({
                    'code': 'fail',
                    'message': 'cannot get access token'
                });
            }
        }).catch(function(err){
        res.json({
            'code': 'fail',
            'message': 'cannot get access token'
        });
    });
});

router.get('/video', function(req, res){
    var modelId = req.query.modelId;
    var objectId = req.query.objectId;
    Video.getPlayerOptions(modelId, objectId)
        .then(function(options){
            res.json({
                'code': 'success',
                'data': options
            });
        }).catch(function(err){
            console.log(err);
            res.json({
                'code': 'fail',
                'message': 'failed to get video player options'
            });
        });
});

router.get('/data', function(req, res){
    var modelId = req.query.modelId;
    var objectId = req.query.objectId;
    var type = req.query.type;
    Data.getEChartOption(modelId, objectId, type)
        .then(function(option){
            res.json({
                'code': 'success',
                'data': option
            });
        }).catch(function(err){
            console.log(err);
            res.json({
                'code': 'fail',
                'message': 'failed to get echart data option'
            });
        });
});

module.exports = router;