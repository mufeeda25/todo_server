var express = require('express');
const { createTodo } = require('../services/data.service');
var router = express.Router();
const dataService = require('../services/data.service');

/* GET home page. */
router.get('/', function(req,res,next) {
  dataService.getTodos()
  .then(todos=>{
res.json(todos);
  })
  router.get('/:id', function(req, res, next) {
    dataService.getTodo(req.params.id)
    .then(todo=>{
      res.json(todo);
    })
  });
  
});
router.post('/',function(req,res,next){
 let data=req.body;
data.userId = req.user_id;
  const result=dataService.createTodo(data);
  res.status(result.statusCode).json(result);
});
router.put('/:id', function(req, res, next) {
  let data = req.body;
  dataService.updateTodo(req.params.id, data)
  .then(data=>{
    res.status(200).json({
      message:"Todo updated successfully"
    });
  });
});

router.delete('/:id', function(req, res, next) {
  dataService.deleteTodo(req.params.id)
  .then(data=>{
    res.status(200).json({
      message:"Todo deleted successfully"
    });
  });
});



module.exports = router;
