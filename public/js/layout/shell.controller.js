(function(){
    'use strict';

    angular
        .module('todoApp')
        .controller('ShellCtrl', ShellCtrl)

    function ShellCtrl(){
        var vm = this;

        console.log("hello");
    }

}());