var app = angular.module('menudata')

app.service('MenuDataService', MenuDataService)

MenuDataService.$inject = ['$http']
function MenuDataService($http) {
    var service = this;
    service.getAllCategories = function() {
        return $http({
            method: 'GET',
            url: 'https://davids-restaurant.herokuapp.com/categories.json'
        }).then (function(responce) {
            return responce.data
        })
    }
    service.getItemsForCategory= function(categoryShortName) {
        return $http({
            method: 'GET',
            url: 'https://davids-restaurant.herokuapp.com/menu_items.json',
            params:{
                category: categoryShortName
            }
        }).then (function(responce) {
            return responce.data
        })
    }
}
