var express = require('express');
var router = express.Router();

var Model = require('../lib/Model.js');
var Token = require('../lib/Token.js');
var Video = require('../lib/Video.js');
var Data = require('../lib/Data.js');
var Bookmark = require('../lib/Bookmark.js');

router.get('/models', function(req, res){
  Model.getModelsByOwner(req.session.loginRole)
    .then(function(models){
        res.json({
            'code': 'success',
            'userRole': req.session.loginRole,
            'data': models
        });
    }).catch(function(err){
        console.log(err);
        res.json({
            'code': 'error',
            'userRole': req.session.loginRole,
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

router.get('/bookmarks', function(req, res) {
    var modelId = req.query.modelId;
    Bookmark.getBookmarksByModelId(modelId)
        .then(function(bookmarks){
            res.json({
                'code': 'success',
                'data': bookmarks
            });
        }).catch(function(err){
            console.log(err);
            res.json({
                'code': 'fail',
                'message': 'failed to get bookmarks information of ' + modelId
            });
        })
});

router.put('/bookmarks', function(req, res) {
    var modelId = req.body.modelId;
    var bookmarks = req.body.bookmarks;
    Bookmark.updateBookmarksByModelId(modelId, bookmarks)
        .then(function(result){
            if(result) res.json({
                'code': 'success'
            });
            else res.json({
                'code': 'fail',
                'message': 'failed to update bookmarks information of ' + modelId
            });
        }).catch(function(err) {
            res.json({
                'code': 'fail',
                'message': 'failed to update bookmarks information of ' + modelId
            });
        });
});

module.exports = router;