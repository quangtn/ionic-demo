var DEMO;

  DEMO = {
  "module": "headerBarSimple",
  "name": "simple",
  "docName": "ionHeaderBar",
  "href": "/nightly/directive/ionHeaderBar/simple",
  "javascript": {
    "path": "nightly/directive/ionHeaderBar/simple/javascript.js",
    "content": "angular.module('headerBarSimple', ['ionic'])\n.controller('HeaderBarSimpleCtrl', function($scope) {\n  $scope.data = {\n    isSubheader: false,\n    isShown: true\n  };\n  $scope.items = [];\n  for (var i = 0; i < 20; i++) {\n    $scope.items.push('Item ' + i);\n  }\n});"
  },
  "html": {
    "path": "nightly/directive/ionHeaderBar/simple/html.html",
    "content": "<div ng-controller=\"HeaderBarSimpleCtrl\">\n  <ion-header-bar class=\"bar-positive\"\n    ng-class=\"{'bar-subheader': data.isSubheader}\"\n    ng-show=\"data.isShown\">\n    <h1 class=\"title\">Tap Me to Scroll Top</h1>\n  </ion-header-bar>\n  <ion-content>\n    <ion-toggle ng-model=\"data.isSubheader\">\n      Make it a Subheader?\n    </ion-toggle>\n    <ion-toggle ng-model=\"data.isShown\">\n      Show it?\n    </ion-toggle>\n    <div class=\"list\">\n      <div class=\"item\" ng-repeat=\"item in items\">\n        {{item}}\n      </div>\n    </div>\n  </ion-content>\n</div>"
  }
};


angular.module('headerBarSimple'
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
      var form = angular.element('<form method="POST" action="http://scratch.ionicsdk.com/embed">');

      var htmlInput = angular.element('<textarea type="text" name="html">')
      .val(['<html ng-app="headerBarSimple">',
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

