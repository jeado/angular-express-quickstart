var app = require("../app.js"),
    request = require("supertest")(app);

describe('POST /todos', function () {
    it('should add a todo', function (done) {
        request
            .post('/todos')
            .send({id: 1, conetent: '2222'})
            .expect(200, {id: 1, conetent: '2222'}, done);
    });
});

describe('PUT /todos/:todoId', function () {
     it('should update a todo', function (done) {
        request
            .put('/todos/1')
            .send({id: 1, content: '11'})
            .expect(200, {id: 1, content: '11'}, done);
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