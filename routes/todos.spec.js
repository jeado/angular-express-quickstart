var app = require("../app.js"),
    request = require("supertest")(app),
    models = require("../models");


describe('Todos Routes', function () {
     before(function (done) {
       models.sequelize.sync({force: true}).then(function () {
            models.Project.create({
                    name: "work"
                }).then(function(project) {
                    done();
                });
        })
    });

    describe('POST /todos', function () {
        it('should add a todo', function (done) {
            request
                .post('/todos')
                .send({content: '2222'})
                .expect(200, {id: 1, content: '2222'}, done);
        });
    });

    describe('PUT /todos/:todoId', function () {
        it('should update a todo', function (done) {
            request
                .put('/todos/1')
                .send({id: 1, content: '11'})
                .end(function () {
                    request.get('/todos/1')
                        .expect(200, function (req, res) {
                            if(res.body.content === '11') done();
                        });
                });
        });
    });

    describe('DELETE /todos/:todoId', function () {
        it('should delete a todo', function (done) {
            request
                .delete('/todos/1')
                .expect(200)
                .end(function () {    
                    request
                        .get('/todos/1')
                        .expect(404, done);
                });
        });
    });

     after(function (done) {
        models.sequelize.drop().then(function () {
            done();
        });
    });
});