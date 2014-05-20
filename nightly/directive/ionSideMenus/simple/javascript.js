var app = angular.module('sideMenusSimple', ['ionic']);
app.controller('SideMenusSimpleCtrl', function($scope, $ionicSideMenuDelegate) {

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

});
