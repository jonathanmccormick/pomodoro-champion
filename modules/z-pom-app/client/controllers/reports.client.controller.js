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
        $scope.report = report.data; // push the result to the report variable
        $scope.sortReport($scope.report);
        $scope.reportRange = range; // update the range display
      });
    };

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

    $scope.calcTotalInReport = function() {
      if ($scope.report) {
        var total = 0;
        for (var i = 0; i < $scope.report.length; i++) {
          total += $scope.report[i].pomLogs.pomsCompleted;
        }
        return total;
      }
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
