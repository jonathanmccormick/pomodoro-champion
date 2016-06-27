(function() {
  'use strict';

  angular
    .module('z-pom-app')
    .controller('PreferencesController', PreferencesController);

  PreferencesController.$inject = ['$scope', 'preferencesService'];

  function PreferencesController($scope, preferencesService) {

    preferencesService.getPrefs()
      .then(function(response) {
        $scope.prefServ = preferencesService;
      });

  }
})();
