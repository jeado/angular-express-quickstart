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
                resolve : {
                    initTodos : function (TodoService) {
                        return TodoService.getInbox()
                            .then(function (result) {
                                return result.data
                            });
                    }
                }
            })
            .otherwise({
                redirectTo : '/inbox'
            });
    }

}());