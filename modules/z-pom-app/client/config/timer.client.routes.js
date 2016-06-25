(function () {
  'use strict';

  //Setting up route
  angular
    .module('z-pom-app')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Timer state routing
    $stateProvider
      .state('timer', {
        url: '/timer',
        templateUrl: 'modules/z-pom-app/client/views/timer.client.view.html',
        controller: 'TimerController',
        controllerAs: 'vm'
      })
      .state('preferences', {
        url: '/preferences',
        templateUrl: 'modules/z-pom-app/client/views/preferences.client.view.html',
        controller: 'PreferencesController',
        controllerAs: 'vm'
      })
      .state('reports', {
        url: '/reports',
        templateUrl: 'modules/z-pom-app/client/views/reports.client.view.html',
        controller: 'ReportsController',
        controllerAs: 'vm'
      });
  }
})();
