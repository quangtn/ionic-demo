var DEMO;

  DEMO = {
  "module": "infiniteScrollForever",
  "name": "forever",
  "docName": "ionInfiniteScroll",
  "href": "/nightly/directive/ionInfiniteScroll/forever",
  "javascript": {
    "path": "nightly/directive/ionInfiniteScroll/forever/javascript.js",
    "content": "angular.module('infiniteScrollForever', ['ionic'])\n.controller('ForeverCtrl', function($scope, $timeout) {\n  $scope.items = [];\n  for (var i = 0; i < 20; i++) {\n    $scope.items.push(i);\n  }\n\n  //Load more after 1 second delay\n  $scope.loadMoreItems = function() {\n    $timeout(function() {\n      var i = $scope.items.length;\n      var j = $scope.items.length + 5;\n      for (; i < j; i++) {\n        $scope.items.push('Item ' + i);\n      }\n      $scope.$broadcast('scroll.infiniteScrollComplete');\n    }, 1000);\n  };\n});\n"
  },
  "html": {
    "path": "nightly/directive/ionInfiniteScroll/forever/html.html",
    "content": "<ion-header-bar>\n  <h1 class=\"title\">Scroll Down to Load More</h1>\n</ion-header-bar>\n<ion-content ng-controller=\"ForeverCtrl\">\n  <div class=\"list\">\n    <div class=\"item\" ng-repeat=\"item in items\">\n      {{item}}\n    </div>\n  </div>\n\n  <ion-infinite-scroll on-infinite=\"loadMoreItems()\"\n    icon=\"ion-loading-c\">\n  </ion-infinite-scroll>\n</ion-content>"
  }
};


angular.module('infiniteScrollForever'
  )
.controller('IonicDemoCtrl', function($scope, $ionicModal, $ionicLoading) {
  $scope.$demos = DEMOS;

  
    $scope.$demo = DEMO;
    $ionicModal.fromTemplateUrl('ionic-demo-modal.html', {
      scope: $scope,
      focusFirstInput: false
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
      var form = angular.element('<form method="POST" action="http://scratch.ionicsdk.com/embed" target="_blank">');

      var htmlInput = angular.element('<textarea type="text" name="html">')
      .val(['<html ng-app="infiniteScrollForever">',
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

