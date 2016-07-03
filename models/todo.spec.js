var Todo = require(".").Todo;
var Project = require(".").Project;
var sequelize = require(".").sequelize;

describe('Todo model', function () {
    before(function(done) {
        sequelize.sync({force: true}).then(function () {
            Project.create({
                    name: "work"
                }).then(function(project) {                
                    done();
                });
        })
    });

    it('should add new todo', function (done) {
        Todo.create({
            content: "implement angularjs demo page",
            done: false,
            project_id: 1
        }).then(function (result) {
            if(result.id == 1) done();
        })
    });

    it('should update todo for given id', function (done) {
        Todo.update({
            done : true,
        }, {
            where : {id:1}
        }).then(function () {
            Todo.findById(1).then(function (result) {
                if(result.done === true) done(); 
            })
        })
    })

    it('should delete todo for given id', function (done) {
        Todo.destroy({
            where : {id:1}
        }).then(function () {
             Todo.findById(1).then(function (result) {
                if(result === null) done(); 
            })
        })
    })
    
    after(function (done) {
        sequelize.drop().then(function () {
            done();
        });
    });
});
