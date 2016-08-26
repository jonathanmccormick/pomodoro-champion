(function() {
  'use strict';

  angular
  .module('z-pom-app')
  .controller('TimerController', TimerController);

  TimerController.$inject = ['$scope', 'timerService', 'dataService', '$timeout'];

  function TimerController($scope, timerService, dataService, $timeout) {

    $scope.interface = timerService.interface;

    $scope.deletePom = function(){
      if (confirm('Are you sure you want to delete a pom?')) {
        dataService.deletePom()
        .then(function(response) {
          timerService.interface.pomsToday = response.data;
        });
      }
    };

    $scope.buttonClicked = function(button) {
      if(button === 'play') {
        timerService.startTimer();
      } else if (button === 'pause') {
        if (timerService.prefs.enablePomPause) {
          timerService.pauseTimer();
        } else {
          $scope.pauseDisabledError = true;
          $timeout(function () {
            $scope.pauseDisabledError = false;
          }, 3000);
        }
      } else if (button === 'stop') {
        if (
              timerService.interface.currentTimer === 'pom'
              &&
              timerService.prefs.confirmPomCancel === true
              &&
              timerService.secondsRemaining < timerService.prefs.pomLength*60
              &&
              timerService.secondsRemaining/60 <= timerService.prefs.pomCancelConfirmationThresholdMinutes
            ) {
          $('#cancelModal').modal('show');
        } else {
          timerService.interface.stopTimer();
        }
      }
    }

    // Task logic
    $scope.tasks = [];

    $scope.tasks.push({title: 'A task'});

    $scope.createNewTask = function() {
      dataService.newTask($scope.newTaskTitle);
    };

  }
})();
