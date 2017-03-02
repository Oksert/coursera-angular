var app = angular.module('app', ['ui.router','spinner'])
app.config(RoutesConfig)
app.service('dataService', ShoppingListService)
app.controller('ctrlList', ctrlList)
app.controller('detailCtrl', detailCtrl)
RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider']

function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/')
    $stateProvider
        .state('home', {
            url: '/',
            template: `<h1>This is home page</h1>`
        })
        .state('list', {
            url: '/list',
            controller: 'ctrlList as ctrl',
            resolve: {
                items: ['dataService', function(dataService) {
                    return dataService.getItems();
                }]
            },
            template: `<list-component data='ctrl.data'>
            </list-component>`
        })
        .state('list.details', {
            url:'/details/{itemId}',
            // resolve: {
            //     item: ['dataService','$stateParams', function(dataService,$stateParams) {
            //         return dataService.getItems().then(function (res) {
            //             return res[$stateParams.itemId]
            //         });
            //     }]
            // },
            controller:'detailCtrl as ctrl',
            // params: {
            //   itemId:null
            // },
            template:`<item-detail item='ctrl.item'></item-detail>`
        })
}
var ctrlList = function (){

}


ShoppingListService.$inject = ['$q', '$timeout']

function ShoppingListService($q, $timeout) {
    var service = this;

    // List of shopping items
    var items = [];

    // Pre-populate a no cookie list
    items.push({
        name: "Sugar",
        quantity: "2 bags",
        description: "Sugar used for baking delicious umm... baked goods."
    });
    items.push({
        name: "flour",
        quantity: "1 bags",
        description: "High quality wheat flour. Mix it with water, sugar, 2 raw eggs."
    });
    items.push({
        name: "Chocolate Chips",
        quantity: "3 bags",
        description: "Put these in the dough. No reason, really. Gotta store them somewhere!"
    });

    // Simulates call to server
    // Returns a promise, NOT items array directly
    service.getItems = function() {
        var deferred = $q.defer();

        // Wait 2 seconds before returning
        $timeout(function() {
            // deferred.reject(items);
            deferred.resolve(items);
        }, 2000);

        return deferred.promise;
    };
}
app.component('listComponent', {
    templateUrl: 'listTpl.html',
    bindings: {
        data: '<'
    }
})
app.component('itemDetail', {
    templateUrl:'detailTpl.html',
    bindings:{
        item:'<'
    }
})
ctrlList.$inject = ['items', 'dataService']
function ctrlList (items) {
  this.data = items;
}
detailCtrl.$inject = ['items','$stateParams']
function detailCtrl(items, $stateParams) {
  this.item = items[$stateParams.itemId]
}
var spinner = angular.module('spinner',[])
spinner.component('spinnerComponent', {
    templateUrl:'spinner.html',
    controller: spinCtrl
})
spinCtrl.$inject=['$rootScope']
function spinCtrl($rootScope) {
    var canceler = []
    this.show = false
    this.$onInit = function() {
      console.log('here');

        var $ctrl = this
        var cancel = $rootScope.$on('$stateChangeStart',function(){
            console.log('hete');
            $ctrl.show = true
        })
        canceler.push(cancel)
        cancel = $rootScope.$on('$stateChangeSuccess',function(){
            $ctrl.show = false
        })
    }
    this.$onDestroy = function(){
        canceler.forEach(function(item) {
            item()
        })
    }
}
