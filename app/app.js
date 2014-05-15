var DEMOS = [
  {
    module: 'sideMenusSimple',
    url: '/directive/ionSideMenus/simple',
    href: '#/directive/ionSideMenus/simple',
    templateUrl: 'demo/directive/ionSideMenus/simple/template.html'
  }
];

var demoApp = angular.module('ionicDemo', ['ionic']
  .concat(DEMOS.map(function(demo) {
    return demo.module;
  }))
);

demoApp.constant('Demos', DEMOS);

demoApp.config(function($stateProvider, $urlRouterProvider, Demos) {

  $stateProvider.state('index', {
    url: '/',
    templateUrl: 'app/index.template.html'
  });

  Demos.forEach(function(demo) {
    $stateProvider.state(demo.module, {
      url: demo.url,
      templateUrl: demo.templateUrl
    });
  });

  $urlRouterProvider.otherwise('/');
});

demoApp.controller('IonicDemoCtrl', function($scope, Demos) {
  $scope.demos = Demos;

});

//If a template has a header bar, hide our navbar and add our own back button
demoApp.directive('ionView', function($ionicNavBarDelegate, $timeout, $rootScope, $ionicViewService) {
  var hasBackButton;
  $rootScope.$on('$viewHistory.historyChange', function(e, data) {
    hasBackButton = !!data.showBack;
  });
  return {
    restrict: 'E',
    link: function(scope, element, attr) {
      $timeout(init);
      function init() {
        var header = angular.element(element[0].querySelector('ion-header-bar'));
        if (header.length && hasBackButton) {
          var backButton = angular.element('<div class="button">← DEMOS</div>');
          backButton.on('click', function(e) {
            var backView = $ionicViewService.getBackView();
            backView && backView.go();
          });

          var parent = header[0].querySelector('.buttons') || header[0];
          parent.insertBefore(backButton[0], parent.firstElementChild);
        }
      }
    }
  };
});
