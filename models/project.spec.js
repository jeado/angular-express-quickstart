var db = require(".");
var Project = db.projects

describe('project model', function() {
    before(function(done) {
        Project.drop().then(function () {
            //sync the model with the database
            Project.sync().then(function() {
                Project.create({
                    name: "work"
                }).then(function(user) {
                    done();
                });
            });
        });        
    });


    it('should get all projects', function(done) {
        Project.findAll().then(function (result) {
            if(result.length == 1) done();
        });
    });

});