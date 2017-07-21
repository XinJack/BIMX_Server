var assert = require('assert');
var Token = require('../lib/Token.js');

describe('#Token', function(){
    describe('#getAccessTokenFromAPI', function(){
        it('correct response', function(done){
            Token.getAccessTokenFromAPI()
                .then(function(token){
                   assert.equal(true, true);
                   done();
                });
        });
    });

    describe('##getAccessToken', function() {
       it('access token is not an empty string', function(done){
           Token.getAccessToken()
               .then(function(token){
                   assert.ok(token.length > 0);
                   done();
               })
       });
    });

    describe.only('##getViewToken', function(){
        it('1115521327153344 and normal should return a non empty string', function(done){
            Token.getViewToken('1115521327153344', 'normal')
                .then(function(token){
                    console.log(token);
                    assert.ok(token.length !== 0)
                    done()
                })
        })

        it('1115521327153344 and integrate should return an empty string', function(done){
            Token.getViewToken('1115521327153344', 'integrate')
                .then(function(token){
                    console.log(token);
                    assert.ok(token.length === 0)
                    done()
                })
        })

        it('1115535906611424 and integrate should return a non empty string', function(done){
            Token.getViewToken('1115535906611424', 'integrate')
                .then(function(token){
                    console.log(token);
                    assert.ok(token.length !== 0)
                    done()
                })
        })

        it('1115535906611424 and normal should return an empty string', function(done){
            Token.getViewToken('1115535906611424', 'normal')
                .then(function(token){
                    console.log(token);
                    assert.ok(token.length === 0)
                    done()
                })
        })
    })
});