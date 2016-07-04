(function(){
    'use strict';

    angular
        .module('todoApp')
        .controller('ShellCtrl', ShellCtrl)

    function ShellCtrl(ProjectService){
        var vm = this;
        ProjectService.getAllProjects()
            .then(function (result) {
                vm.projects = result.data;
            })
    }

}());