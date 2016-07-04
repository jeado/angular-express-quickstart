(function () {
    'use strict';

    angular
        .module ('todoApp')
        .directive ('todoEditor', todoEditor);


    function todoEditor() {

        function todoEditorController($scope){
              $scope.edit = false;
        }

        function link(scope, element, attrs){

        }

        return {
            templateUrl: 'js/components/todo-editor.html',    
            controller: todoEditorController,
            link: link,
            restrict: 'AE',
            scope: {
                todo : "=",
                toggleDone : "&onToggleDone",
                save : "&onSave"
            },
        }
    }

} ());