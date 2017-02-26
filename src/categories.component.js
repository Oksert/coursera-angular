(function() {
    angular.module('data')
        .component('categories', {
            templateUrl: 'templates/categories.html',
            controller: categoriesController,
            bindings: {

            }
        });

    categoriesController.$inject = ['MenuDataService'];

    function categoriesController(MenuDataService) {
        var $ctrl = this;
        $ctrl.$onInit = function() {
            console.log('here');
        }
        $ctrl.categories = []
        var promise = MenuDataService.getAllCategories();
        promise.then(function (resp) {
          $ctrl.categories = resp.data.map(function(el) {
              return el.name;
          }) ;
        })
        console.log('categories: ', $ctrl.categories);

    }
})();
