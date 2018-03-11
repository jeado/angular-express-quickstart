(function() {
  "use strict";

  angular.module("todoApp").controller("TodoCtrl", TodoCtrl);

  function TodoCtrl(TodoService, initTodos, ProjectService) {
    var vm = this;
    console.log(initTodos);
    if (initTodos.project) vm.project = initTodos.project;
    vm.title = initTodos.project
      ? initTodos.project.name + " Project"
      : "Inbox";
    vm.todos = initTodos.data;
    vm.addTodo = function(content) {
      TodoService.addTodo({
        content: content,
        done: false,
        project_id: initTodos.project ? initTodos.project.id : null
      }).then(refresh);
    };

    vm.toggleDone = function(todo, message) {
      TodoService.updateTodo(todo.id, {
        done: todo.done
      }).then(refresh);
    };

    vm.updateTodo = function(todo) {
      console.log(todo);
      TodoService.updateTodo(todo.id, {
        content: todo.content
      }).then(refresh);
    };

    function refresh(response) {
      console.log(response);
      vm.newContent = "";
      if (vm.project) {
        ProjectService.getTodosByProjectId(vm.project.id).then(function(result) {
          console.log(result.data)
          vm.todos = result.data.data;
        });
      } else {
        TodoService.getInbox().then(function(result) {
          console.log(result.data)
          vm.todos = result.data.data;
        });
      }
    }
  }
})();
