var DEMO;

  DEMO = {
  "module": "actionSheetSimple",
  "name": "simple",
  "docName": "$ionicActionSheet",
  "href": "/nightly/service/$ionicActionSheet/simple",
  "javascript": {
    "path": "nightly/service/$ionicActionSheet/simple/javascript.js",
    "content": "angular.module('actionSheetSimple', ['ionic'])\n.controller('ActionSheetCtrl', function($scope, $ionicActionSheet) {\n  $scope.messages = [];\n  $scope.takeAction = function() {\n    $ionicActionSheet.show({\n      buttons: [\n        { text: 'Share <i class=\"icon ion-share\">' },\n        { text: 'Edit <i class=\"icon ion-edit\">' }\n      ],\n      destructiveText: 'Delete <i class=\"icon ion-trash-b\">',\n      titleText: 'Modify your album',\n      cancelText: 'Cancel',\n      cancel: function() {\n        $scope.message('Cancel');\n        return true;\n      },\n      buttonClicked: function(index) {\n        $scope.message(index === 0 ? 'Share' : 'Edit');\n        return true;\n      },\n      destructiveButtonClicked: function() {\n        $scope.message('Delete');\n        return true;\n      }\n    });\n  };\n  $scope.message = function(msg) {\n    $scope.messages.unshift({\n      text: 'User pressed ' + msg\n    });\n  };\n\n});\n"
  },
  "html": {
    "path": "nightly/service/$ionicActionSheet/simple/html.html",
    "content": "<ion-header-bar class=\"bar-positive\">\n  <h1 class=\"title\">Action</h1>\n</ion-header-bar>\n<ion-content ng-controller=\"ActionSheetCtrl\" class=\"padding\">\n  <div class=\"button button-assertive button-block\" ng-click=\"takeAction()\">\n    Take Action!\n  </div>\n  <div class=\"card\" ng-show=\"messages.length\">\n    <div class=\"item item-divider\">\n      User Log\n    </div>\n    <div class=\"item item-text-wrap\">\n      <div ng-repeat=\"message in messages\">\n        {{message.text}}\n      </div>\n    </div> \n  </div>\n</ion-content>"
  }
};


angular.module('actionSheetSimple'
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
      .val(['<html ng-app="actionSheetSimple">',
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

