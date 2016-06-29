'use strict';

angular.module('z-pom-app').service('dataService', [ '$http', function($http) {

  var self = this;

  // return local date in YYYY-MM-DD
  self.today = function() {
    return moment().format('YYYY-MM-DD');
  };

  self.addPom = function() {
    $http.put('/api/user/poms/' + self.today())
      .success(function (status){
      })
      .error(function(status){
        console.log('Total failure, try again.');
      });
  };

  self.addFailedPom = function() {
    $http.put('/api/user/poms/failed/' + self.today())
      .success(function (status){
      })
      .error(function(status){
        console.log('Total failure, try again.');
      });
  };

  self.deletePom = function() {
    return $http.delete('/api/user/poms/' + self.today())
      .success(function (response){
        return response;
      })
      .error(function(status){
        console.log('Total failure, try again.');
      });
  };

  self.getPoms = function() {
    return $http.get('/api/user/poms/' + self.today())
      .then(function(response) {
        return response.data;
      });
  };

}]);
