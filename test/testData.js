var assert = require('assert');
var Data = require('../lib/Data.js');

describe.only('#Data', function() {
	describe('#getEChartOption', function() {
		it('##modelId 1058899859071168, objectId 385761, type temperature should return a non empty object', function(done){
			Data.getEChartOption('1058899859071168', '385761', 'temperature')
			.then(function(option){
				assert.ok(option !== {});
				done();
			});
		});

		it('##modelId 1058899859070000, objectId 385761, type temperature should return an empty object', function(done){
			Data.getEChartOption('1058899859070000', '385761', 'temperature')
			.then(function(option){
				assert.deepEqual(option, {});
				done();
			});
		});

		it('##modelId 1058899859071168, objectId 385700, type temperature should return an empty object', function(done){
			Data.getEChartOption('1058899859071168', '385700', 'temperature')
			.then(function(option){
				assert.deepEqual(option, {});
				done();
			});
		});

		it('##modelId 1058899859071168, objectId 385761, type other should return an empty object', function(done){
			Data.getEChartOption('1058899859071168', '385761', 'other')
			.then(function(option){
				assert.deepEqual(option, {});
				done();
			});
		});
	});
});