(function(){
    'use strict';

    angular
        .module('todoApp')
        .controller('TodoCtrl', TodoCtrl)

    function TodoCtrl(TodoService, initTodos, ProjectService){    
        var vm = this;
        console.log(initTodos);
        if(initTodos.project) vm.project = initTodos.project;
        vm.title = (initTodos.project) ? initTodos.project.name + " Project" : "Inbox";
        vm.todos = initTodos.data;  
        vm.addTodo = function (content) {    
            TodoService.addTodo({
                content: content,
                done: false,
                project_id : (initTodos.project) ? initTodos.project.id : null    
            })
                .success(refresh);
        };

        vm.toggleDone = function (todo, message) {            
            TodoService.updateTodo(todo.id, {
                done : todo.done
            }).success(refresh);
        }
        
        vm.updateTodo = function (todo) {
            console.log(todo);       
            TodoService.updateTodo(todo.id, {                
                content : todo.content
            }).success(refresh);
        }

        function refresh() {
            vm.newContent = "";
            if(vm.project) 
                ProjectService.getTodosByProjectId(vm.project.id)
                    .then(function (result) {
                        vm.todos = result.data
                    })
            else 
                TodoService.getInbox()
                    .success(function (result) {                        
                        vm.todos = result.data;
                    });
        }
    }

}());