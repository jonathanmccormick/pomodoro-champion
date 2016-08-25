'use strict';

angular.module('z-pom-app').service('dataService', [ '$http', function($http) {

  var self = this;

  self.getPoms = function() {
    return $http.get('/api/user/poms/' + moment().format('YYYY-MM-DD'))
      .then(function(response) {
        return response.data;
      });
  };

  // New functionality
  self.currentPomId = null;
  self.currentPauseId = null;

  self.startPom = function() {
    $http.put(`/api/user/pom/start/${Date.now()}`)
      .success(function (response){
        self.currentPomId = response;
        return;
      })
      .error(function(status){
        logFailureMessage()
      });
  };

  self.completePom = function() {
    console.log(self.currentPomId);
    $http.put(`/api/user/pom/${self.currentPomId}/complete/${Date.now()}`)
      .success(function (response){
        return response;
      })
      .error(function(status){
        logFailureMessage()
      });
  };

  self.failPom = function() {
    $http.put(`/api/user/pom/fail/${Date.now()}`)
      .success(function (response){
        return response;
      })
      .error(function(status){
        logFailureMessage()
      });
  };

  self.pausePom = function() {
    $http.put(`/api/user/pom/${self.currentPomId}/pause/${Date.now()}`)
      .success(function (response){
        self.currentPauseId = response;
      })
      .error(function(status){
        logFailureMessage()
      });
  };

  self.resumePom = function() {
    $http.put(`/api/user/pom/${self.currentPomId}/pause/${self.currentPauseId}/resume/${Date.now()}`)
      .success(function (response){
        return response;
      })
      .error(function(status){
        logFailureMessage()
      });
  };

  function logFailureMessage() {
    onsole.log('Total failure, try again.');
  }

}]);
