var express = require('express'),
    router = express.Router();

var memoryDb = {};

router.get('/:todoId', function (req, res) {
    var todoId = req.params.todoId;
    var todo = memoryDb[todoId];

    if(todo) res.json(todo);
    else res.status(404).send({message:"no found"});
})

router.post('/', function(req, res){
    var todo = req.body;

    memoryDb[todo.id] = todo;

    res.json(todo);
});

router.put('/:todoId', function(req, res){
    var todo = req.body;
    memoryDb[todo.id] = todo;

    res.json(memoryDb[todo.id]);
});

router.delete('/:todoId', function (req, res) {
    var todoId = req.params.todoId;
    memoryDb[todoId] = null;
    
    res.json({message:"successfully deleted"});
});

module.exports = router;