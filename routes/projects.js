var express = require("express"),
    router = express.Router(),
    Project = require("../models").Project,
    Todo = require("../models").Todo;

router.get("/", function(req, res) {
    Project.findAll().then(function (result) {
      res.json({ data : result });  
    });
});

router.get("/:projectId", function(req, res){
    var projectId = parseInt(req.params.projectId);
    Project.findById(projectId)
        .then(function (result) {
            if(result == null) res.status(404).json({message:"not found"});
            else res.json(result);
        });
});

router.get("/:projectId/todos", function(req, res){
    var projectId = null;
    if(req.params.projectId === "*") projectId = "*"; 
    else projectId = parseInt(req.params.projectId) || null;
    
    if(projectId === "*") Todo.findAll().then(function (result) {
        res.json({
            data : result
        });
    });
    else Project.find({
        where : { id : projectId },
        include: {model: Todo}
    }).then(function (result) {
        if(result == null) res.status(404).json({message:"No project " + projectId + " found"});
        else res.json({ data : result.Todos });        
    })
    
});

module.exports = router;