var express = require('express'),
    router = express.Router(),
    Todo = require("../models").Todo;

router.get('/:todoId', function (req, res) {
    var todoId = req.params.todoId;

    Todo.findById(todoId).then(function (result) {        
        if(result) res.json(result);
        else res.status(404).send({message:"not found"});
    });
});

router.post('/', function(req, res){
    Todo.create(req.body)
        .then(function (result) {
            res.json(result);
        });    
});

router.put('/:todoId', function(req, res){
    var todoId = req.params.todoId;

    Todo.update(req.body, {
        where : {id : todoId}
    }).then(function (result) {
        console.log(result[0]);
        if(result[0] === 0) res.status(404).send({message:"not found"});
        else res.json({message:"successfully updated"});
    })
});

router.delete('/:todoId', function (req, res) {
    var todoId = req.params.todoId;
    Todo.destroy({
            where : {id : todoId}
        }).then(function (result) {
            if(result === 0) res.status(404).send({message:"not found"});
            else res.json({message:"successfully deleted"});
        });    
});

module.exports = router;