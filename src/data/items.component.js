var app = angular.module('menudata')

app.component('items', {
    templateUrl:'./src/data/items.html',
    bindings: {
      itemsList:'<'
    },
    controller:itemsCtrl
})
function itemsCtrl () {
    console.log(this.itemsList);
    // this.categoryName = itemsList;
    this.itemsList = this.itemsList.menu_items
    // console.log(this.itemsList);
}
