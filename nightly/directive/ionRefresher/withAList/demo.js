var DEMO;

  DEMO = {
  "module": "refresherList",
  "name": "withAList",
  "docName": "ionRefresher",
  "href": "/nightly/directive/ionRefresher/withAList",
  "javascript": {
    "path": "nightly/directive/ionRefresher/withAList/javascript.js",
    "content": "angular.module('refresherList', ['ionic'])\n.controller('RefresherCtrl', function($scope, $timeout) {\n  $scope.items = ['Item 1', 'Item 2', 'Item 3'];\n\n  $scope.doRefresh = function() {\n    $timeout(function() {\n      $scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);\n      $scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);\n      $scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);\n      $scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);\n      $scope.$broadcast('scroll.refreshComplete');\n    }, 1000);\n  };\n});"
  },
  "html": {
    "path": "nightly/directive/ionRefresher/withAList/html.html",
    "content": "<ion-header-bar class=\"bar-positive\">\n  <h1 class=\"title\">Refresher</h1>\n</ion-header-bar>\n\n<ion-content ng-controller=\"RefresherCtrl\">\n\n  <ion-refresher on-refresh=\"doRefresh()\" \n                 pulling-text=\"Pull to refresh...\" \n                 refreshing-text=\"Refreshing!\" \n                 refreshing-icon=\"ion-loading-c\">\n  </ion-refresher>\n\n  <ion-list>\n    <ion-item ng-repeat=\"item in items\">{{item}}</ion-item>\n  </ion-list>\n\n</ion-content>"
  }
};


angular.module('refresherList'
  )
.controller('IonicDemoCtrl', function($scope, $ionicModal, $ionicLoading) {
  $scope.$demos = DEMOS;

  
    $scope.$demo = DEMO;
    $ionicModal.fromTemplateUrl('ionic-demo-modal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.$demoModal = modal;
    });

    //don't try this at home
    ionic.onGesture('dragup', function(e) {
      if (e.gesture.distance > 35 && !$scope.$demoModal.isShown()) {
        $scope.$apply(function(e) {
          $scope.$demoModal.show();
        });
      }
    }, document.querySelector('.demo-footer'));

    $scope.demoScratch = function(demo) {
      var form = angular.element('<form method="POST" action="http://scratch.ionicsdk.com/embed">');

      var htmlInput = angular.element('<textarea type="text" name="html">')
      .val(['<html ng-app="refresherList">',
           '<head>',
           '  <meta charset="utf-8">',
           '  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">',
           '  <link rel="stylesheet" href="http://code.ionicframework.com/nightly/css/ionic.css">',
           '  <script src="http://code.ionicframework.com/nightly/js/ionic.bundle.js"></script>',
           '</head>',
           '<body>',
           (demo.html && demo.html.content || ''),
           '</body>',
           '</html>'].join('\n'));

           var cssInput = angular.element('<textarea type="text" name="css">')
           .val(demo.css && demo.css.content || '');

           var jsInput = angular.element('<textarea type="text" name="js">')
           .val(demo.javascript && demo.javascript.content || '');

           form
           .css('display','none')
           .append(htmlInput)
           .append(cssInput)
           .append(jsInput);

           document.body.appendChild(form[0]);
           form[0].submit();

           $ionicLoading.show({
             template: 'Opening in Scratchpad...'
           });
    };
    
})
.filter('humanize', function() {
  return function(input) {
    return input.charAt(0).toUpperCase() +
      input.substring(1).replace(/[A-Z]/g, function(match, i) {
        return ' ' + match.toUpperCase();
      });
  };
});

