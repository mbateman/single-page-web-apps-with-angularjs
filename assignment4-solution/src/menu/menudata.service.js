(function () {
'use strict';

angular.module('data')
.constant("ApiBasePath", "https://davids-restaurant.herokuapp.com")
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ["$http", "ApiBasePath"];
function MenuDataService($http, ApiBasePath) {
  var service = this;

  service.getAllCategories = function() {
    var promise = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    }).then(function (result) {
        return result.data;
    });
    return promise;
  };

  service.getItemsForCategory = function (categoryShortName) {
    var promise = $http({
      method: "GET",
        url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)
    }).then(function (result) {
      return result.data.menu_items;
    });
    return promise;
  };

}

})();
