(function(){
    'use strict';

    angular
        .module('todoApp')
        .service('TodoService', TodoService)

    function TodoService($http){
        this.getInbox = getInbox;
        this.addTodo = addTodo;
        this.updateTodo = updateTodo;

        function getInbox(){
            return $http.get("projects/*/todos");
        }
        
        function addTodo(todo) {
            return $http.post("todos", todo);
        }

        function updateTodo(id, todo) {
             return $http.put("todos/"+id, todo);
        }
    }

}());