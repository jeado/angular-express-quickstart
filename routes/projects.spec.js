var app = require("../app.js"),
    request = require("supertest")(app);


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
                id : 2,
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
                    data: [{todos : [{ id: 3, done: false, content: "study 2", dueDate: "2012-02-12T 21:00:22z323", priority : 1}]}]
                }, done )
    });

    it('shoud support * projectId for return inbox todos', function(done){
        request
            .get('/projects/*/todos')
            .expect(200, 
                { 
                    data: [{todos : [{ id: 1, done: false, content: "study", dueDate: "2012-02-12T 21:00:22z323", priority : 1}]}]
                }, done);
    });
});



