var assert = require('assert');
var Video = require('../lib/Video.js');

describe('#Video', function(){
	describe.only('##getPlayerOptions', function(){
		it('modelId 1058899859071168 and objectId 373005 should return a non empty object', function(done){
			Video.getPlayerOptions('1058899859071168', '373005')
				.then(function(options){
					assert.ok(options !== {});
					done()
				});
		});

		it('modelId 1058899859071168 and objectId 0 should return an empty object', function(done){
			Video.getPlayerOptions('1058899859071168', '0')
				.then(function(options){
					assert.deepEqual(options, {});
					done()
				});
		});

		it('modelId 0 and objectId 373005 should return an empty object', function(done){
			Video.getPlayerOptions('0', '373005')
				.then(function(options){
					assert.deepEqual(options, {});
					done()
				});
		});

		it('modelId 0 and objectId 0 should return an empty object', function(done){
			Video.getPlayerOptions('0', '0')
				.then(function(options){
					assert.deepEqual(options, {});
					done()
				});
		});
	});
});