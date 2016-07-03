var db = require(".");
var sequelize = db.sequelize;
var Project = db.Project;
var Todo = db.Todo;

describe('project model', function() {
    before(function(done) {
        sequelize.sync({force: true}).then(function () {
            Project.create({
                    name: "work"
                }).then(function(project) {
                     Todo.create({
                        content: "implement angularjs demo page",
                        done: false,
                        project_id: project.id
                    }).then(function(user) {
                        done();
                    });
                });
        })
    });


    it('should get all projects', function(done) {
        Project.findAll().then(function (result) {
            if(result.length == 1) done();
        });
    });

    
    it('should get todo for given project', function (done) {
        Project.find({
            where : {id:1},
            include: {model: Todo}
        }).then(function (result) {
            if(result.Todos[0].id == 1) done();
        })
    });

    
    after(function (done) {
        sequelize.drop().then(function () {
            done();
        });
    });
    
});