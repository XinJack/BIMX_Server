var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');
var FileStreamRotator = require('file-stream-rotator');

var User = require('./lib/User.js');
var Model = require('./lib/Model.js');
var Token = require('./lib/Token.js');
var Video = require('./lib/Video.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('combined', {
  stream: FileStreamRotator.getStream({
    date_format: 'YYYY-MM-DD',
    filename: path.join(__dirname, '/logs/access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
  })
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'BIMX secret for BIMFACE application',
    resave: true,
    saveUninitialized: true
}));

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/login', function(req, res){
  res.sendFile(__dirname + '/views/login.html');
});

app.post('/login', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  User.validateUser(username, password)
      .then(function(validate){
          if(validate){
              req.session.hasLogin = true;
              req.session.loginRole = username;
              res.json({
                  'code': 'success'
              })
          }else{
              res.json({
                  'code': 'error',
                  'message': '用户名或密码错误'
              })
          }
      }).catch(function(err){
        res.json({
            'code': 'error',
            'message': '用户名或密码错误'
        })
  })
});

// app.use(function(req, res, next){
//   if(req.session.hasLogin){
//     next();
//   }else{
//     res.redirect('/login');
//   }
// });

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/logout', function(req, res){
   delete req.session.hasLogin;
   delete req.session.loginRole;
   res.json({
        'code': 'success'
   });
});

app.get('/api/models', function(req, res){
  Model.getModelsByAllow(req.session.loginRole)
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
        })
  })
});

app.get('/api/viewToken', function(req, res){
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

app.get('/api/video', function(req, res){
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


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
