'use strict';

angular
.module('z-pom-app')
.service('ReportsService', ['$http', function($http) {
    var self = this;

    self.getReport = function(startDate, endDate) {
        return $http.get(`/api/user/reports/${startDate}/${endDate}`)
        .success(function(response) {
            return response;
        })
        .error(function() {
            console.log('error');
        });
    }
}]);
