(function(){
    'use strict';

    angular
        .module('todoApp')
        .config(ConfigConfig)

    function ConfigConfig($routeProvider){
        $routeProvider
            .when('/inbox', {
                templateUrl: 'js/todo/todo.html',
                controller: 'TodoCtrl'
            })
            .when('/today', {
                templateUrl: 'js/todo/todo.html',
                controller: 'TodoCtrl'
            })
            .otherwise({
                redirectTo : '/inbox'
            });
    }

}());