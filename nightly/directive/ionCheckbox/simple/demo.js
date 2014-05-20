var DEMO;

  DEMO = {
  "module": "checkboxSimple",
  "name": "simple",
  "docName": "ionCheckbox",
  "href": "/nightly/directive/ionCheckbox/simple",
  "javascript": {
    "path": "nightly/directive/ionCheckbox/simple/javascript.js",
    "content": "var app = angular.module('checkboxSimple', ['ionic']);\napp.controller('CheckboxSimpleCtrl', function($scope) {\n  $scope.pizza = {\n    pepperoni: true,\n    sausage: false,\n    anchovies: true,\n    jalapenos: false\n  };\n\n  $scope.toppings = function() {\n    var toppings = Object.keys($scope.pizza).filter(function(flavor) {\n      return $scope.pizza[flavor];\n    });\n    if (toppings.length > 1) {\n      toppings[toppings.length - 1] = 'and ' + toppings[toppings.length - 1];\n    }\n    if (toppings.length > 2) {\n      return toppings.join(', ');\n    } else if (toppings.length) {\n      return toppings.join(' ');\n    } else {\n      return 'nothing';\n    }\n  };\n});"
  },
  "html": {
    "path": "nightly/directive/ionCheckbox/simple/html.html",
    "content": "<ion-header-bar class=\"bar-positive\">\n  <h1 class=\"title\">\n    Checkbox: Simple Usage\n  </h1>\n</ion-header-bar>\n<ion-content ng-controller=\"CheckboxSimpleCtrl\" class=\"padding\">\n  <h3>Your pizza has {{toppings()}}!</h3>\n  <ion-checkbox ng-model=\"pizza.pepperoni\">\n    Pepperoni?\n  </ion-checkbox>\n  <ion-checkbox ng-model=\"pizza.sausage\">\n    Sausage?\n  </ion-checkbox>\n  <ion-checkbox ng-model=\"pizza.anchovies\">\n    Jalapeno?\n  </ion-checkbox>\n  <ion-checkbox ng-model=\"pizza.jalapenos\">\n    Anchovies?\n  </ion-checkbox>\n</ion-content>"
  }
};


angular.module('checkboxSimple'
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
      .val(['<html ng-app="checkboxSimple">',
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

