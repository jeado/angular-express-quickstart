(function(){
    'use strict';

    angular
        .module('todoApp')
        .controller('TodoCtrl', TodoCtrl)

    function TodoCtrl(TodoService, initTodos, $routeParams){
        var vm = this;

        vm.title = "Inbox";
        vm.todos = initTodos.data;  
        vm.addTodo = function (content) {    
            TodoService.addTodo(content)
                .success(function () {
                    vm.newContent = "";    
                    TodoService.getInbox()
                        .success(function (result) {                        
                            vm.todos = result.data;
                        });
                });
        };
        
        vm.toggleDone = function (todo) {
            TodoService.updateTodo(todo.id, {
                done : todo.done
            }).success(function () {
                vm.newContent = "";    
                TodoService.getInbox()
                    .success(function (result) {                        
                        vm.todos = result.data;
                    });
            });
        }
    }

}());