var express = require("express"),
    router = express.Router(),
    Project = require("../models").projects;

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
    var data = { data: [{todos : [{ id: 1, done: false, content: "study", dueDate: "2012-02-12T 21:00:22z323", priority : 1}]}]}
    var data2 = { data: [{todos : [{ id: 3, done: false, content: "study 2", dueDate: "2012-02-12T 21:00:22z323", priority : 1}]}]}
    if(projectId === "*") res.json(data);
    else res.json(data2);
});

module.exports = router;