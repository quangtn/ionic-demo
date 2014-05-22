var DEMO;

  DEMO = {
  "module": "listEverything",
  "name": "reorderDelete",
  "docName": "ionList",
  "href": "/nightly/directive/ionList/reorderDelete",
  "javascript": {
    "path": "nightly/directive/ionList/reorderDelete/javascript.js",
    "content": "angular.module('listEverything', ['ionic'])\n.controller('ListCtrl', function($scope, $ionicPopup) {\n  $scope.data = {\n    showReorder: false,\n    showDelete: false\n  };\n\n  $scope.items = [];\n  for (var i = 0; i < 20; i++) {\n    $scope.items.push(i);\n  }\n\n  $scope.toggleDelete = function() {\n    $scope.data.showReorder = false;\n    $scope.data.showDelete = !$scope.data.showDelete;\n  };\n  $scope.toggleReorder = function() {\n    $scope.data.showDelete = false;\n    $scope.data.showReorder = !$scope.data.showReorder;\n  };\n\n  $scope.share = function(item) {\n    alert('Sharing ' + item);\n  };\n  $scope.edit = function(item) {\n    alert('Editing ' + item);\n  };\n\n  $scope.reorderItem = function(item, fromIndex, toIndex) {\n    $scope.items.splice(fromIndex, 1)\n    $scope.items.splice(toIndex, 0, item)\n  };\n});\n"
  },
  "html": {
    "path": "nightly/directive/ionList/reorderDelete/html.html",
    "content": "<div ng-controller=\"ListCtrl\">\n  <ion-header-bar class=\"bar-positive\">\n    <a class=\"button\" ng-click=\"toggleDelete()\">\n      Delete\n    </a>\n    <h1 class=\"title\">List</h1>\n    <a class=\"button\" ng-click=\"toggleReorder()\">\n      Reorder\n    </a>\n  </ion-header-bar>\n  <ion-content>\n    <ion-list show-delete=\"data.showDelete\"\n              show-reorder=\"data.showReorder\">\n      <ion-item ng-repeat=\"item in items\"\n                class=\"item-thumbnail-left\">\n\n        <img ng-src=\"http://placekitten.com/{{60+$index}}/{{61+2*$index}}\">\n        <h2>Item {{item}}</h2>\n        <p>Here's an item description.</p>\n        <ion-option-button class=\"button-positive\"\n                           ng-click=\"share(item)\">\n          Share\n        </ion-option-button>\n        <ion-option-button class=\"button-info\"\n                           ng-click=\"edit(item)\">\n          Edit\n        </ion-option-button>\n        <ion-delete-button class=\"ion-minus-circled\"\n                           ng-click=\"items.splice($index, 1)\">\n        </ion-delete-button>\n        <ion-reorder-button class=\"ion-navicon\"\n                            on-reorder=\"reorderItem(item, $fromIndex, $toIndex)\">\n        </ion-reorder-button>\n\n      </ion-item>\n    </ion-list>\n  </ion-content>\n</div>"
  }
};


angular.module('listEverything'
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
      .val(['<html ng-app="listEverything">',
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

