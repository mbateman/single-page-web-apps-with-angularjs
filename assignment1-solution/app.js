(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.message = "";
  $scope.itemCount = 0;
  $scope.items = "";

  $scope.checkIfTooMuch = function() {
    $scope.itemCount = 0;
    $scope.countItems();
  }

  $scope.countItems = function () {
    var items = $scope.items.split(',');
    if ($scope.items.length == 0) {
      $scope.itemCount = 0;
    } else {
      items = items.filter(function(item) {return item.trim().length > 0} );
      $scope.itemCount = items.length;
    }
    if ($scope.itemCount == 0) {
      $scope.message = "Please enter data first"
    } else
    if ($scope.itemCount > 3) {
      $scope.message = "Too Much!"
    } else {
      $scope.message = "Enjoy!"
    }
  };
}

})();
