var assert = require('assert');
var Model = require('../lib/Model.js');

describe('#Model', function() {
    describe('##getModelsByAllow', function(){
        it('admin should return a non-empty array', function(done){
            Model.getModelsByAllow('admin').then(function(models){
                assert.equal(models.length, 3);
                done();
            });
        });

        it('test should return an empty array', function(done){
            Model.getModelsByAllow('test').then(function(models){
                assert.equal(models.length, 0);
                done();
            });
        });

        it('guest should return a non-empty array', function(done){
            Model.getModelsByAllow('guest').then(function(models){
                assert.equal(models.length, 7);
                done();
            });
        });
    });

    describe('##getModelsByOwner', function(){
        it('owner admin should return a non-empty array', function(done) {
            Model.getModelsByOwner('admin').then(function(models){
                assert.ok(models.length > 0);
                done();
            }).catch(function(err){
                console.log(err);
                done();
            });
        });
        
        it('owner guest should return a non-empty array', function(done) {
            Model.getModelsByOwner('guest').then(function(models){
                assert.ok(models.length > 0);
                done();
            });
        });
        
        it('owner test should return an empty array', function(done) {
            Model.getModelsByOwner('test').then(function(models){
                assert.ok(models.length === 0);
                done();
            });
        });

    });
});