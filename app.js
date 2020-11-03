var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors =require ('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const db =require('./models');
const dataService= require('./services/data.service');




var app = express();
app.use(cors({
  origin:'http://localhost:4200',
  credentials:true
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const authMiddleware = (req,res,next) =>{
  const tokenHeader = req.headers['authorization'];
  if(tokenHeader){
    const bearer = tokenHeader.split(' ');
    const bearerToken = bearer[1];
    dataService.verifyToken(bearerToken, req,res, next);
  }
  else{
    res.status(401).json({"message":"Authentication failed"})
  }
}



app.use('/users', usersRouter);
app.use('/', authMiddleware,indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
