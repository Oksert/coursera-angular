(function () {
    var app = angular.module("LunchCheck",[]);
    app.controller("LunchCheckController", LunchCheckController);
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController ($scope) {
        $scope.createMessage = function () {
          $scope.message = calcNumber($scope.dishes);
        }
        function calcNumber (str) {
          if (!str) {
            return "Please enter data first";
          }
          var allItems = str.split(',');
          if (allItems.length > 3) {
            return "Too much!";
          } else {
            return "Enjoy!";
          }
        }
    }

})();
