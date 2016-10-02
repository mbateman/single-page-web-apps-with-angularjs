(function () {
'use strict';

angular.module('LunchChecker', [])
.controller('LunchCheckerController', LunchCheckerController);

LunchCheckerController.$inject = ['$scope'];
function LunchCheckerController($scope) {
  $scope.okOrTooMuch = "";
  $scope.itemCount = 0;
  $scope.items = "";

  $scope.checkIfTooMuch = function() {
    $scope.itemCount();
    console.log($scope.items);
  }

  $scope.itemCount = function () {
    var items = $scope.items.split(',');
    $scope.itemCount = items.length;
    if ($scope.itemCount > 3) {
      $scope.okOrTooMuch = "Too Much!"
    } else {
      $scope.okOrTooMuch = "Ok!"
    }
  };
}

})();
