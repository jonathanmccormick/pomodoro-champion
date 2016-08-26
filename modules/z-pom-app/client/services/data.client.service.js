'use strict';

angular.module('z-pom-app').service('dataService', [ '$http', function($http) {

  var self = this;
  self.currentPomId;
  self.currentPauseId;

  self.getPoms = function() {
    return $http.get('/api/user/poms/' + moment().format('YYYY-MM-DD'))
      .then(function(response) {
        return response.data;
      });
  };

  self.startPom = function() {
    $http.put(`/api/user/pom/start/${Date.now()}`)
      .success(function (response){
        self.currentPomId = response;
        return;
      })
      .error(function(status){
        logFailureMessage();
      });
  };

  self.completePom = function() {
    console.log(self.currentPomId);
    $http.put(`/api/user/pom/${self.currentPomId}/complete/${Date.now()}`)
      .success(function (response){
        return response;
      })
      .error(function(status){
        logFailureMessage();
      });
  };

  self.failPom = function() {
    $http.put(`/api/user/pom/fail/${Date.now()}`)
      .success(function (response){
        return response;
      })
      .error(function(status){
        logFailureMessage();
      });
  };

  self.pausePom = function() {
    $http.put(`/api/user/pom/${self.currentPomId}/pause/${Date.now()}`)
      .success(function (response){
        self.currentPauseId = response;
      })
      .error(function(status){
        logFailureMessage();
      });
  };

  self.resumePom = function() {
    $http.put(`/api/user/pom/${self.currentPomId}/pause/${self.currentPauseId}/resume/${Date.now()}`)
      .success(function (response){
        return response;
      })
      .error(function(status){
        logFailureMessage();
      });
  };

  // Tasks

  self.newTask = function(title) {
    $http.put(`/api/user/new/task/${title}`)
      .success(function (response){
        return response;
      })
      .error(function(status){
        logFailureMessage();
      });
  };

  function logFailureMessage() {
    console.log('Total failure, try again.');
  }

}]);
