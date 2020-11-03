var express = require('express');
var router = express.Router();
const dataService = require('../services/data.service');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/',function(req,res,next){

  dataService.createUser(req.body)
  .then(result=>{
    res.status(result.statusCode).json(result);
  })
  
});
router.post('/login',function(req,res,next){

  dataService.login(req.body)
  .then(result=>{
    res.status(result.statusCode).json(result);
  })
  
});
module.exports = router;
