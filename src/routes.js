(function() {
    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state('home', {
            url: '/',
            templateUrl: 'src/templates/home.html'
        })

        .state('categories', {
            url: '/categories',
            templateUrl: 'src/templates/categories.html',
            controller: 'categoriesController as mainCtrl'
        })
    }
})();
