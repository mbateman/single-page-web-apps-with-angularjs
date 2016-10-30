(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItems);

function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      list: '<',
      title: '@title',
      result: "@result",
      onRemove: '&',
    }
  };
  return ddo;
}

function MenuSearchService($http, $filter) {
  var service = this;

  var found = [];

  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
    }).then(function (result) {
        // process result and only keep items that match
        var foundItems = $filter('filter') (result.data.menu_items, searchTerm);
        found = foundItems;
        return found;
    });
  }

  service.getItems = function () {
    return found;
  };

}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;

  list.found = [];

  list.title = "Menu Items";

  list.searchTerm;

  list.searchResult;

  list.getMatchedMenuItems = function () {

    if (!list.searchTerm || list.searchTerm.length == 0) {
      list.searchResult = "Please enter a search term";
      return;
    }

    var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);

    promise.then(function (response) {
      list.found = response;
      if (list.found.length == 0) {
        list.searchResult = "Nothing found";
      } else {
        list.searchResult = ""
      }
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
      console.log(error);
    })
  };

  list.onRemove = function (index) {
    list.found.splice(index, 1);
  };

}

})();
