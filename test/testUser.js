var assert = require('assert');
var User = require('../lib/User.js');

describe('#User', function() {
    describe('##validateUser', function(){
        it('admin and admin should return true', function(done){
            User.validateUser('admin', 'admin')
                .then(function(result){
                   assert.equal(result, true);
                   done();
                });
        });

        it('guest and guest should return true', function(done){
            User.validateUser('guest', 'guest')
                .then(function(result){
                    assert.equal(result, true);
                    done();
                });
        });

        it('admin and guest should return true', function(done){
            User.validateUser('admin', 'guest')
                .then(function(result){
                    assert.equal(result, false);
                    done();
                });
        });

        it('test and admin should return true', function(done){
            User.validateUser('test', 'admin')
                .then(function(result){
                    assert.equal(result, false);
                    done();
                });
        });
    })
});