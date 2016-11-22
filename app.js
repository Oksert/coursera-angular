(function () {
    var app = angular.module("ShoppingListCheckOff",[]);
    app.controller("ToBuyController", ToBuyController);
    app.controller("AlreadyBoughtController", AlreadyBoughtController);
    app.service("ShoppingListCheckOffService", ShoppingListCheckOffService);
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController (ShoppingListCheckOffService) {
      var self = this;
      self.items = ShoppingListCheckOffService.getToBuyItems();
      self.buyItem = function(idx) {
        ShoppingListCheckOffService.checkOutItem(idx);
      }
    }
    function AlreadyBoughtController (ShoppingListCheckOffService) {
      var self = this;
      self.items = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService () {
      var self = this;
      var toBuyItems = [
        { name: "cookies", quantity: 10 },
        { name: "drinks", quantity: 5 },
        { name: "chips", quantity: 3 },
        { name: "apples", quantity: 20 },
        { name: "oranges", quantity: 3 }
      ];
      var boughtItems = [];
      self.checkOutItem = function (idx) {
        boughtItems.push(toBuyItems[idx]);
        toBuyItems.splice(idx,1);
      }
      self.getToBuyItems = function () {
        return toBuyItems;
      }
      self.getBoughtItems = function () {
        return boughtItems;
      }

    }

})();
