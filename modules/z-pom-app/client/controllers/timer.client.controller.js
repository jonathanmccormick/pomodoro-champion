(function() {
  'use strict';

  angular
  .module('z-pom-app')
  .controller('TimerController', TimerController);

  TimerController.$inject = ['$scope', 'timerService', 'dataService'];

  function TimerController($scope, timerService, dataService) {

    $scope.interface = timerService.interface;
    $scope.interface.newController();

    $scope.deletePom = function(){
      if (confirm('Are you sure you want to delete a pom?')) {
        dataService.deletePom()
        .then(function(response) {
          timerService.interface.pomsToday = response.data;
        });
      }
    };

    // Remove tooltip functionality, it doesn't really make sense

    // jQuery
    // $(function(){
    //
    //     // Initialize Bootstrap tooltip
    //     $(document).ready(function(){
    //         $('[data-toggle="tooltip"]').tooltip();
    //     });
    //
    //     $('.circle-container').hover(
    //         function() {
    //             $('#deletePom').show('slide', {duration: 200, easing: 'swing'});
    //         },
    //         function() {
    //             $('#deletePom').hide('slide', {duration: 200, easing: 'swing'});
    //         }
    //     );
    //
    // });

  }
})();
