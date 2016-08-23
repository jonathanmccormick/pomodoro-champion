(function() {
  'use strict';

  angular
  .module('z-pom-app')
  .controller('ReportsController', ReportsController);

  ReportsController.$inject = ['$scope', 'ReportsService'];

  function ReportsController($scope, ReportsService) {
    // Ranges available
    $scope.reportRanges = [
      'This Week',
      'Last Week',
      'This Month',
      'Last Month'
    ];
    $scope.daysInRange;

    // Calculate query start and end dates based on selected report range
    $scope.calcDates = function(range) {
      // Define vars for the switch statement
      var startOfWeek, endOfWeek;
      switch (range) {
        case 'This Week':
          startOfWeek = moment().startOf('week').format('YYYY-MM-DD');
          endOfWeek = moment().endOf('week').format('YYYY-MM-DD');
          return [startOfWeek, endOfWeek];
        case 'Last Week':
          startOfWeek = moment().subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD');
          endOfWeek = moment().subtract(1, 'weeks').endOf('week').format('YYYY-MM-DD');
          return [startOfWeek, endOfWeek];
        case 'This Month':
          startOfWeek = moment().startOf('month').format('YYYY-MM-DD');
          endOfWeek = moment().endOf('month').format('YYYY-MM-DD');
          return [startOfWeek, endOfWeek];
        case 'Last Month':
          startOfWeek = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
          endOfWeek = moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
          return [startOfWeek, endOfWeek];
      }
    };

    $scope.rangeChanged = function(range) {
      var dates = $scope.calcDates(range); // Get dates from the range that was provided
      // Query the DB
      ReportsService.getReport(dates[0], dates[1])
      .then(function(report) {
        $scope.rawDataFromDB = report.data; // Store raw data for later processing as required by the different report the user wishes to generate

        $scope.createPreliminaryReport(report.data);

        $scope.reportRange = range; // update the range display
      });
    };

    $scope.createPreliminaryReport = function(report) {

      var dates = [];

      for (var i = 0; i < report.length; i++) {
        var date = moment(report[i].momentCompleted).format('YYYY-MM-DD')
        if (!findWithAttr(dates, 'date', date)) {
          dates.push({'date': date, 'pomsCompleted': 1});
        } else if (findWithAttr(dates, 'date', date)) {
          for(var o = 0; o < dates.length; o += 1) {
              if(dates[o]['date'] === date) {
                  dates[o].pomsCompleted++;
              }
          }
        }
      }
      $scope.preliminaryReport = dates;

    };

    function findWithAttr(array, attr, value) {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return true;
            }
        }
        return false;
    }

    // Sort days in report by date
    $scope.sortReport = function(data) {
      function compare(a,b) {
        if (a.pomLogs.date < b.pomLogs.date)
          return -1;
        else if (a.pomLogs.date > b.pomLogs.date)
          return 1;
        else
          return 0;
      }
      data.sort(compare);
    };

    $scope.calcBarHeight = function(numOfPoms) {
      return numOfPoms * 20 + 20;
    };

    // Default the report range to this week
    $scope.reportRange = $scope.reportRanges[0];
    // ... and get some data
    $scope.rangeChanged($scope.reportRange);
  }
})();
