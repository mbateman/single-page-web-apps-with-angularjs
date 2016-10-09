(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

function ShoppingListCheckOffService() {
  var service = this;

  // List of to buy items
  var toBuy = [
    { name: "apples", quantity: 10 },
    { name: "oranges", quantity: 5 },
    { name: "pears", quantity: 8 },
    { name: "melons", quantity: 2 },
    { name: "mandarins", quantity: 7 }
  ];
  
  // List of bought items
  var bought = [];

  service.buyItem = function(itemIndex) {
    var item = toBuy[itemIndex];
    bought.push(item);
    service.removeToBuyItem(itemIndex);
  };

  service.removeToBuyItem = function (itemIndex) {
    toBuy.splice(itemIndex, 1);
  };

  service.removeBoughtItem = function (itemIndex) {
    bought.splice(itemIndex, 1);
  };

  service.getToBuyItems = function () {
    return toBuy;
  };

  service.getBoughtItems = function () {
    return bought;
  };
}

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;

  toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

  toBuyList.empty = function() {
    return ShoppingListCheckOffService.getToBuyItems().length == 0;
  }

  toBuyList.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  }

  toBuyList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeToBuyItem(itemIndex);
  };
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.items = ShoppingListCheckOffService.getBoughtItems();

  boughtList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeBoughtItem(itemIndex);
  };

  boughtList.empty = function() {
    return ShoppingListCheckOffService.getBoughtItems().length == 0;
  }

}

})();
