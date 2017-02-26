(function() {
    angular.module('data')
        .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http'];

    function MenuDataService($http) {
        var service = this;
        service.getAllCategories = function() {
            return $http({
                method: 'GET',
                url: 'https://davids-restaurant.herokuapp.com/categories.json'
            })
        }
        service.allCategories = service.getAllCategories();
        service.getItemsForCategory = function(categoryShortName) {
            return $http({
                method: 'GET',
                url: 'https://davids-restaurant.herokuapp.com/categories.json' + categoryShortName
            })
        }
    }
})();
