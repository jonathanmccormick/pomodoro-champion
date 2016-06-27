(function() {
  'use strict';

  angular
  .module('z-pom-app')
  .controller('ImportController', ImportController);

  ImportController.$inject = ['$scope', '$http', '$timeout'];

  function ImportController($scope, $http, $timeout) {
    $scope.date;
    $scope.numberOfPoms;

    $scope.import = function(date, numberOfPoms) {
      $http.put(`/api/user/poms/new/${date}/${numberOfPoms}/`)
      .success(function(response) {
        $scope.displaySuccessMessage();
      })
      .error(function() {
        console.log('error');
      });
    }

    $scope.displaySuccessMessage = function() {
      $scope.message = 'Imported!';
      $timeout(function() {
        $scope.message = '';
      }, 3000);
    }
  }
})();
