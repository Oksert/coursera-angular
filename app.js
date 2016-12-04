(function () {
    var app = angular.module("NarrowItDownApp",[]);
    app.controller("NarrowItDownController", NarrowItDownController);
    app.service("MenuSearchService", MenuSearchService);
    app.directive("foundItems", foundItemsDirective)

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService ($http) {
      var service = this;
      service.getMatchedMenuItems = function (searchTerm) {
        return $http ({
          method: 'GET',
          url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
        }).then(function (responseData) {
          service.items = responseData.data.menu_items.filter (function (item) {
              return (item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > 0);
          })
          console.log(service.items);
          return service.items;
        })
      }
      service.onRemove = function (arr, idx) {
        arr.splice(idx,1);
      }
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      var ctrl = this;
      ctrl.isEmpty = false;
      this.narrowIt = function () {
        if (!ctrl.searchTerm) {
          ctrl.isEmpty = true;
          return;
        }
        MenuSearchService.getMatchedMenuItems(ctrl.searchTerm).then(function (responseData) {
          ctrl.menu = responseData;
          ctrl.isEmpty = ctrl.menu.length == 0?true:false;
        })
      }
      ctrl.onRemove = function (idx) {
        MenuSearchService.onRemove(ctrl.menu,idx);
      }
    }
    function foundItemsDirective () {
      var ddo = {
        templateUrl:'foundItems.html',
        scope: {
          items: '<',
          onRemove: '&'
        },
        controller:foundItemsDirectiveController,
        controllerAs:'foundCtrl',
        bindToController:true
      }
      return ddo;

    }
    function foundItemsDirectiveController () {
      var list = this;
      list.isEmpty = function () {
        $setTimeout(function () {
            return list.items.length == 0;
        }, 0);
      }
    }

})();
