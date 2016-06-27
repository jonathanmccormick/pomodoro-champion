'use strict';

angular
.module('z-pom-app')
.service('preferencesService', [ '$rootScope', '$http', function($rootScope, $http) {

  var self = this;

  self.getPrefs = function() {
    return $http.get('api/users/me')
    .success(function(response){
      self.userPrefs = response.preferences;
      return response.preferences;
    });
  };

  self.savePrefs = function(key, val) {
    // Save the local obeject
    self.userPrefs[key] = val;
    // Push it to the database
    $http.put('/api/user/preferences', self.userPrefs)
      .success(function (status){
      })
      .error(function(status){
        console.log('Total failure, try again.');
      });
    // Broadcast the change
    $rootScope.$broadcast('prefsUpdated');
    // Pull from the database?
  };

}]);
