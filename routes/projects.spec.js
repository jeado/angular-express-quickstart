var app = require("../app.js"),
    request = require("supertest")(app),
    models = require("../models");

describe('Projects Route', function () {
    
    before(function (done) {
       models.sequelize.sync({force: true}).then(function () {
            models.Project.create({
                    name: "work"
                }).then(function(project) {
                     models.Todo.create({
                        content: "implement angularjs demo page",
                        done: false,
                        project_id: project.id
                    }).then(function(user) {
                        done();
                    });
                });
        })
    });

   describe('GET /projects', function () {  
        it('should return project lists', function (done) {
            request
                .get('/projects')
                .expect(200, {
                    data : [
                        {id:1, name:"work"}
                    ]
                },done)
        });
    });

    describe('GET /projects/:projectId', function () {
        it('should return project', function (done) {
            request
                .get('/projects/1')
                .expect(200, {
                    id : 1,
                    name : "work"
                }, done)
        });

        it('shoud return 404 when id does not exists', function (done) {
            request
                .get('/projects/2')
                .expect(404, done)
        });
    });


    describe('GET /projects/:projectId/todos', function () {
        it('should return todos for projectId', function(done){
            request
                .get('/projects/1/todos')
                .expect(200, 
                    { 
                        data: [{ id: 1, done: false, content: "implement angularjs demo page", due_date: null, priority : null, project_id: 1}]
                    }, done )
        });

        it('shoud support * projectId for return inbox todos', function(done){
            request
                .get('/projects/*/todos')
                .expect(200, 
                    { 
                        data: [{ id: 1, done: false, content: "implement angularjs demo page", due_date: null, priority : null, project_id: 1}]
                    }, done);
        });
    });
 
    after(function (done) {
        models.sequelize.drop().then(function () {
            done();
        });
    });
});