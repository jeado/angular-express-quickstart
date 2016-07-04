(function(){
    'use strict';

    angular
        .module('todoApp')
        .service('ProjectService', ProjectService)

    function ProjectService($http){

        this.getAllProjects = getAllProjects;
        this.getTodosByProjectId = getTodosByProjectId;
        this.getProject = getProject;
        
        function getAllProjects(){
            return $http.get('projects')
                .then(function (result) {
                    return result.data;
                })
        }

        function getProject(id) {
            return $http.get('projects/'+id)
                .then(function (result) {
                    return result.data;
                })
        }
        function getTodosByProjectId(projectId) {
            return $http.get('projects/'+projectId+'/todos')
                .then(function (result) {
                    return result.data;
                })   
        }
    }

}());