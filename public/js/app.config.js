(function(){
    'use strict';

    angular
        .module('todoApp')
        .config(ConfigConfig)

    function ConfigConfig($routeProvider){
        $routeProvider
            .when('/inbox', {
                templateUrl: 'js/todo/todo.html',
                controller: 'TodoCtrl',
                controllerAs: 'Todo',
                resolve : {
                    initTodos : function (TodoService) {
                        return TodoService.getInbox()
                            .then(function (result) {
                                return result.data
                            });
                    }
                }
            })
            .when('/inbox/today', {
                templateUrl: 'js/todo/todo.html',
                controller: 'TodoCtrl',
                controllerAs: 'Todo',
                resolve : {
                    initTodos : function (TodoService) {
                        return TodoService.getInbox()
                            .then(function (result) {
                                return result.data
                            });
                    }
                }
            })
            .when('/projects/:projectId/todos', {
                templateUrl: 'js/todo/todo.html',
                controller: 'TodoCtrl',
                controllerAs: 'Todo',
                resolve : {
                    initTodos : function (ProjectService, $route, $q) {
                        var projectId = $route.current.params.projectId;
                        return $q.all({
                                data : ProjectService.getTodosByProjectId(projectId).then(function (result) {
                                  return result.data;  
                                }), 
                                project: ProjectService.getProject(projectId)}
                            )
                            .then(function (results) {
                                return results;
                            });
                    },
                }
            })
            .otherwise({
                redirectTo : '/inbox'
            });
    }

}());