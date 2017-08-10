var assert = require('assert');
var mongoose = require('mongoose');

// 设置mongo数据库并连接数据库
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/BIMFace');

var Bookmark = require('../lib/Bookmark.js');

describe.only('#Bookmark', function(){
	describe('##getBookmarksByModelId', function(){
		it('modelId 1145397448384704 should return a non empty array', function(done) {
			Bookmark.getBookmarksByModelId('1145397448384704')
			.then(function(data){
				assert.ok(data.length > 0);
				done();
			});
		});

		it('modelId 1145397448384705 should return an empty array', function(done) {
			Bookmark.getBookmarksByModelId('1145397448384705')
			.then(function(data){
				assert.ok(data.length === 0);
				done();
			});
		});
	});

	describe('##updateBookmarksByModelId', function(){
		it('modelId 1145397448384704 should return true', function(done) {
			Bookmark.updateBookmarksByModelId('1145397448384704', [
    {
        "bookmarkName" : "bookmark1",
        "cameraStatus" : {
            "position" : {
                "x" : 309.704685133415,
                "y" : -689.879130173102,
                "z" : -594.569423433843
            },
            "target" : {
                "x" : -12.3730625901538,
                "y" : -79.5203057453282,
                "z" : -415.799527294779
            },
            "up" : {
                "x" : 0.0,
                "y" : -1.0,
                "z" : 0.0
            }
        }
    }, {test: 'test'}
])
			.then(function(data){
				assert.ok(data);
				done();
			});
		});

		it('modelId 1145397448384705 should return false', function(done) {
			Bookmark.updateBookmarksByModelId('1145397448384705', [
    {
        "bookmarkName" : "bookmark1",
        "cameraStatus" : {
            "position" : {
                "x" : 309.704685133415,
                "y" : -689.879130173102,
                "z" : -594.569423433843
            },
            "target" : {
                "x" : -12.3730625901538,
                "y" : -79.5203057453282,
                "z" : -415.799527294779
            },
            "up" : {
                "x" : 0.0,
                "y" : -1.0,
                "z" : 0.0
            }
        }
    }
])
			.then(function(data){
				assert.ok(!data);
				done();
			});
		});
	});
});