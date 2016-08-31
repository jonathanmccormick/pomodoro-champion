'use strict';

angular
.module('z-pom-app')
.service('timerService', ['$interval', 'preferencesService', '$rootScope', 'dataService', function($interval, preferencesService, $rootScope, dataService) {

  var self = this;

  self.interface = {
    currentTimer: 'pom',
    playPause: 'play',
    displayTime: '00:00',
    pomsToday: 0,
    getNumber: function(n) {
      return new Array(n);
    },
    stopTimer: function() {
      if (
            self.interface.currentTimer === 'pom' &&
            self.secondsRemaining > 0 &&
            self.secondsRemaining < self.prefs.pomLength*60
         ) {
        dataService.failPom();
      }
      self.interface.currentTimer = 'pom';
      self.resetTimer();
      self.interface.playPause = 'play';
      self.timerInProgress = false;
      $('#cancelModal').modal('hide');
    }
  };

  self.resetTimer = function() {
    if(self.interface.currentTimer === 'break') {
      self.timerLength = self.prefs.breakLength;
    } else if (self.interface.currentTimer === 'longBreak') {
      self.timerLength = self.prefs.longBreakLength;
    } else if (self.interface.currentTimer === 'pom') {
      self.timerLength = self.prefs.pomLength;
    }

    $interval.cancel(self.timerTicker);
    self.secondsRemaining = self.timerLength * 60;
    self.updateDisplay();
  };

  self.updateDisplay = function() {
    self.minutesRemaining = Math.floor(self.secondsRemaining / 60);
    self.displaySeconds = ('0' + self.secondsRemaining % 60).toString().slice(-2);
    self.interface.displayTime = `${self.minutesRemaining}:${ self.displaySeconds }`;
  };

  self.startTimer = function(selectedTask) {

    self.interface.playPause = 'pause';

    if (self.secondsRemaining === self.prefs.pomLength*60 && self.interface.currentTimer === 'pom') {
      dataService.startPom(selectedTask);
    } else if (self.secondsRemaining < self.prefs.pomLength*60 && self.interface.currentTimer === 'pom') {
      dataService.resumePom();
    }

    // Timer engine
    self.timerTicker = $interval( function(){
      if(self.secondsRemaining !== 0){
        self.timerInProgress = true;
        self.secondsRemaining --;
        self.updateDisplay();
      } else {
        self.timerInProgress = false;
        self.notify();
        if(self.interface.currentTimer === 'pom') {
          // dataService.addPom();
          dataService.completePom();
          self.updatePomCount();
          if(self.interface.pomsToday % self.prefs.pomsBeforeLongBreak === 0 ) {
            self.startNextTimer('longBreak');
          } else {
            self.startNextTimer('break');
          }
        } else if (self.interface.currentTimer === 'break' || self.interface.currentTimer === 'longBreak') {
          if(self.prefs.automaticallyStartNextPom) {
            self.startNextTimer('pom');
          } else {
            self.interface.stopTimer();
          }
        } else {
          self.resetTimer();
        }
      }
    }, 1000);
  };

  self.pauseTimer = function() {
    self.interface.playPause = 'play';
    $interval.cancel(self.timerTicker);
    dataService.pausePom();
  };

  // Update timer and data when preferences updated
  $rootScope.$on('prefsUpdated', function () {
    if(self.timerInProgress === false) {
      self.prefs = preferencesService.userPrefs;
      self.resetTimer();
    }
  });

  self.startNextTimer = function(type) {
    self.interface.currentTimer = type;
    self.resetTimer();
    self.startTimer();
  };

  self.notify = function() {
    if(self.prefs.notifyWhenPomEnds) {
      new Audio('/media/Affirmative.mp3').play();
    }
  };

  self.updatePomCount = function() {
    
    dataService.getPoms()
      .then(function(poms) {
        self.interface.pomsToday = poms;
      });

    dataService.getTasks()
      .then(function(tasks) {
        self.interface.tasks = tasks.data;
        console.log(self.interface.tasks);
        self.calculatePomTotals();
      });

  };

  self.calculatePomTotals = function() {

    var timeActual = 0, timeEstimate = 0;

    self.interface.tasks.forEach(function(task) {
      timeActual += task.timeActual;
      timeEstimate += task.timeEstimate;
    }, this);

    self.interface.timeActual = timeActual;
    self.interface.timeEstimate = timeEstimate;

  };
  
  self.updatePomCount();

  preferencesService.getPrefs()
  .then(function(response){
    self.prefs = response.data.preferences;
    self.timerLength = self.prefs.pomLength;
    self.secondsRemaining = self.prefs.pomLength * 60;
    self.updateDisplay();
  });
  self.timerInProgress = false;

}]);
