angular.module('app', [])
    .component('headerList', {
        templateUrl: 'itenHandler.html',
        controller: headerListCtrl,
        bindings: {
            banned: '@'
        }
    })
    .factory('factoryService', myFactory)
    .service('weightLossService', weightLossFunc)

function factoryService(weightLossService, $q) {
    var service = this
    service.items = []
    this.addItem = function(item, amount) {
        var promise1 = weightLossService.checkName(item)
        var promise2 = weightLossService.checkAmount(amount)
        $q.all([promise1, promise2]).then(function(res) {
            service.items.push(item)
            this.newItem = ''
        }, function(res) {
            alert(res.message)
        })
    }
    this.remove = function(idx) {
        service.items.splice(idx, 1)
    }
    this.getItems = function() {
        return this.items
    }

}
headerListCtrl.$inject = ['factoryService']

function headerListCtrl(factoryService) {
    var service = factoryService()
    this.addItem = service.addItem
    this.items = service.getItems()
    this.deleteItem = service.remove
}

myFactory.$inject = ['weightLossService', '$q']

function myFactory(weightLossService, $q) {
    return function() {
        return new factoryService(weightLossService, $q)
    }
}
weightLossFunc.$inject = ['$q', '$timeout']

function weightLossFunc($q, $timeout) {
    var service = this

    service.checkName = function(name) {
        var deferred = $q.defer()
        $timeout(function() {
            if (name.toLowerCase().indexOf('cookie') == -1) {
                deferred.resolve({
                    message: ''
                })
            } else {
                deferred.reject({
                    message: 'No.'
                })
            }
        }, 2000);
        return deferred.promise
    }
    service.checkAmount = function(amount) {

        var deferred = $q.defer()
        $timeout(function() {
            if (amount > 3) {
                deferred.resolve({
                    message: 'ok'
                })
            } else {
                deferred.reject({
                    message: 'no'
                })
            }
        }, 2000)
        return deferred.promise
    }
}
