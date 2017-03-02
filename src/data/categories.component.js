var app = angular.module('menudata')


app.component('categories', {
    templateUrl: './src/data/categories.html',
    bindings: {
        list: '<'

    },
    controller: categoryCtrl
})
categoryCtrl.$inject = ['$element']

function categoryCtrl($element) {
    console.log(this);
    this.onClick = function() {

        // $(window).scrollTop(0)
      angular.element($element).focus()
        console.log('clicking');
    }
    console.log($element);
}
