var DEMO;

  DEMO = {
  "module": "sideMenusSimple",
  "name": "simple",
  "docName": "ionSideMenus",
  "href": "/nightly/directive/ionSideMenus/simple",
  "javascript": {
    "path": "nightly/directive/ionSideMenus/simple/javascript.js",
    "content": "var app = angular.module('sideMenusSimple', ['ionic']);\napp.controller('SideMenusSimpleCtrl', function($scope, $ionicSideMenuDelegate) {\n\n  $scope.toggleLeft = function() {\n    $ionicSideMenuDelegate.toggleLeft();\n  };\n\n});"
  },
  "html": {
    "path": "nightly/directive/ionSideMenus/simple/html.html",
    "content": "<ion-view title=\"Side Menus Simple\" ng-controller=\"SideMenusSimpleCtrl\">\n  <ion-side-menus>\n\n    <ion-side-menu-content>\n      <ion-header-bar class=\"bar-positive\">\n        <div class=\"buttons\">\n          <div class=\"button button-clear\" ng-click=\"toggleLeft()\">\n            <i class=\"icon ion-navicon\"></i>\n          </div>\n        </div>\n      </ion-header-bar>\n      <ion-content class=\"padding\">\n        <p>Slide the content or press the button on the header to open a side menu.</p>\n      </ion-content>\n    </ion-side-menu-content>\n\n    <ion-side-menu side=\"left\">\n      <ion-header-bar class=\"bar-positive\">\n      </ion-header-bar>\n      <ion-content>\n        <a class=\"item\" ng-click=\"toggleLeft()\">\n          Close Menu\n        </a>\n      </ion-content>\n    </ion-side-menu>\n\n  </ion-side-menus>\n</ion-view>"
  }
};


angular.module('sideMenusSimple'
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
      .val(['<html ng-app="sideMenusSimple">',
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

