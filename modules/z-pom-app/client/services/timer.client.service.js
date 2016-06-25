'use strict';

angular
    .module('z-pom-app')
    .service('timerService', ['$interval', 'preferencesService', '$rootScope', 'dataService', function($interval, preferencesService, $rootScope, dataService) {

        var self = this;

        // Interface for interacting with controllers
        self.interface = {
            currentTimer: 'pom',
            playPause: 'play',
            displayTime: 'ERR',
            pomsToday: 0,
            getNumber: function(n) {
                return new Array(n);
            },
            // fires every time a different controller is loaded
            newController: function() {
                // self.updateDisplay();
            },
            buttonClicked: function(button) {
                if(button === 'play') {
                    self.interface.playPause = 'pause';
                    self.startTimer();
                } else if (button === 'pause') {
                    self.interface.playPause = 'play';
                    $interval.cancel(self.timerTicker);
                } else if (button === 'stop') {
                    self.stopTimer();
                }
            }
        };

        // Internal Logic
        self.resetTimer = function() {

            // Check if we should start a pom or a break
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

        // Timer engine
        self.startTimer = function() {
            self.timerTicker = $interval( function(){
                if(self.secondsRemaining !== 0){
                    self.timerInProgress = true;
                    self.secondsRemaining --;
                    self.updateDisplay();
                } else {
                    self.timerInProgress = false;
                    if(self.interface.currentTimer === 'pom') {
                        self.notify();

                        // Add a pom to the DB
                        dataService.addPom();

                        // Get number of poms from DB and update internal counter
                        self.updatePomCount();

                        // Check if the this break should be long or normal
                        if(self.interface.pomsToday % self.prefs.pomsBeforeLongBreak === 0 ) {
                            // Start a long break
                            self.startNextTimer('longBreak');
                        } else {
                            // Start a normal break
                            self.startNextTimer('break');
                        }
                    // If the we just finished a break, decide what to do next
                    } else if (self.interface.currentTimer === 'break' || self.interface.currentTimer === 'longBreak') {
                        // If the preferences are set to automatically start a new pom...
                        if(self.prefs.automaticallyStartNextPom) {
                            // ...start a new pom
                            self.startNextTimer('pom');
                        } else {
                            // otherwise, stop the timer
                            self.stopTimer();
                        }
                    } else {
                        self.resetTimer();
                        console.log('something is really really broken... :(');
                    }
                }
            }, 1000);
        };

        self.stopTimer = function() {
            self.interface.currentTimer = 'pom';
            self.resetTimer();
            self.interface.playPause = 'play';
            self.timerInProgress = false;
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

        // Update pom count from DB
        self.updatePomCount = function() {
            dataService.getPoms()
                .then(function(poms) {
                    self.interface.pomsToday = poms;
                });
        };
        self.updatePomCount();
        // self.prefs = preferencesService.userPrefs;
        // self.timerLength = self.prefs.pomLength;
        // self.secondsRemaining = self.prefs.pomLength * 60;
        preferencesService.getPrefs()
            .then(function(response){
                self.prefs = response.data.preferences;
                console.log(self.prefs);
                self.timerLength = self.prefs.pomLength;
                self.secondsRemaining = self.prefs.pomLength * 60;
                self.updateDisplay();
            });
        self.timerInProgress = false;


    }]);
