var app = angular.module('MenuApp')
app.config(RoutesConfig)
app.controller('categoryCtrl', categoryCtrl)
app.controller('itemsCtrl', itemsCtrl)
RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider']

function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/')
    $stateProvider
        .state('home', {
            url: '/',
            template: `<h1>Welcome to Home page!</h1>
                        <button ui-sref='categories'>Go to categories list</button>`
        })
        .state('categories', {
            resolve: {
                list: ['MenuDataService', function(MenuDataService) {
                    return MenuDataService.getAllCategories()
                }]
            },
            url: '/categories',
            controller: 'categoryCtrl as ctrl',
            template: `<categories list='ctrl.list'></categories>`

        })
        .state('categories.items', {
            resolve: {
                items_list: ['MenuDataService','$stateParams', function(MenuDataService,$stateParams) {
                    return MenuDataService.getItemsForCategory($stateParams.categoryShortName)
                }]
            },
            params:{
                categoryShortName:null
            },
            controller:'itemsCtrl as ctrl',
            template: `<items items-list='ctrl.items_list'></items>`,
            url:'/items_for_category/{categoryShortName}'
        })
}
categoryCtrl.$inject = ['list']
itemsCtrl.$inject = ['items_list']
function categoryCtrl(list) {

    this.list = list

}
function itemsCtrl (items_list) {
    this.items_list = items_list

}
