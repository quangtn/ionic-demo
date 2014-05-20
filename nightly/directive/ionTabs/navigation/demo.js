var DEMO;

  DEMO = {
  "module": "tabsAndNavigation",
  "name": "navigation",
  "docName": "ionTabs",
  "href": "/nightly/directive/ionTabs/navigation",
  "javascript": {
    "path": "nightly/directive/ionTabs/navigation/javascript.js",
    "content": "angular.module('tabsAndNavigation', ['ionic'])\n.config(function ($stateProvider, $urlRouterProvider) {\n\n  $stateProvider\n    .state('tabs', {\n      url: \"/tab\",\n      abstract: true,\n      templateUrl: \"tabs.html\"\n    })\n    .state('tabs.home', {\n      url: \"/home\",\n      views: {\n        'home-tab': {\n          templateUrl: \"home.html\",\n          controller: 'HomeTabCtrl'\n        }\n      }\n    })\n    .state('tabs.facts', {\n      url: \"/facts\",\n      views: {\n        'home-tab': {\n          templateUrl: \"facts.html\"\n        }\n      }\n    })\n    .state('tabs.facts2', {\n      url: \"/facts2\",\n      views: {\n        'home-tab': {\n          templateUrl: \"facts2.html\"\n        }\n      }\n    })\n    .state('tabs.about', {\n      url: \"/about\",\n      views: {\n        'about-tab': {\n          templateUrl: \"about.html\"\n        }\n      }\n    })\n    .state('tabs.navstack', {\n      url: \"/navstack\",\n      views: {\n        'about-tab': {\n          templateUrl: \"nav-stack.html\"\n        }\n      }\n    })\n    .state('tabs.contact', {\n      url: \"/contact\",\n      views: {\n        'contact-tab': {\n          templateUrl: \"contact.html\"\n        }\n      }\n    });\n\n\n  $urlRouterProvider.otherwise(\"/tab/home\");\n\n})\n\n.controller('HomeTabCtrl', function ($scope) {\n  console.log('We have arrived at HomeTabCtrl.');\n});"
  },
  "html": {
    "path": "nightly/directive/ionTabs/navigation/html.html",
    "content": "<ion-nav-bar class=\"nav-title-slide-ios7 bar-positive\">\n  <ion-nav-back-button class=\"button-icon ion-arrow-left-c\">\n  </ion-nav-back-button>\n</ion-nav-bar>\n\n<ion-nav-view animation=\"slide-left-right\"></ion-nav-view>\n\n<script id=\"tabs.html\" type=\"text/ng-template\">\n  <ion-tabs class=\"tabs-icon-top tabs-positive\">\n\n    <ion-tab title=\"Home\" icon=\"ion-home\" href=\"#/tab/home\">\n      <ion-nav-view name=\"home-tab\"></ion-nav-view>\n    </ion-tab>\n\n    <ion-tab title=\"About\" icon=\"ion-ios7-information\" href=\"#/tab/about\">\n      <ion-nav-view name=\"about-tab\"></ion-nav-view>\n    </ion-tab>\n\n    <ion-tab title=\"Contact\" icon=\"ion-ios7-world\" ui-sref=\"tabs.contact\">\n      <ion-nav-view name=\"contact-tab\"></ion-nav-view>\n    </ion-tab>\n\n  </ion-tabs>\n</script>\n\n<script id=\"home.html\" type=\"text/ng-template\">\n  <ion-view title=\"Home\">\n    <ion-content class=\"padding\">\n      <p>Example of Ionic tabs. Navigate to each tab, and\n      navigate to child views of each tab and notice how\n      each tab has its own navigation history.</p>\n      <p>\n        <a class=\"button icon icon-right ion-chevron-right\" href=\"#/tab/facts\">Scientific Facts</a>\n      </p>\n    </ion-content>\n  </ion-view>\n</script>\n\n<script id=\"facts.html\" type=\"text/ng-template\">\n  <ion-view title=\"Facts\" class=\"padding\">\n    <ion-content>\n      <p>Banging your head against a wall uses 150 calories an hour.</p>\n      <p>Dogs have four toes on their hind feet, and five on their front feet.</p>\n      <p>The ant can lift 50 times its own weight, can pull 30 times its own weight and always falls over on its right side when intoxicated.</p>\n      <p>A cockroach will live nine days without it's head, before it starves to death.</p>\n      <p>Polar bears are left handed.</p>\n      <p>\n        <a class=\"button icon ion-home\" href=\"#/tab/home\"> Home</a>\n        <a class=\"button icon icon-right ion-chevron-right\" href=\"#/tab/facts2\">More Facts</a>\n      </p>\n    </ion-content>\n  </ion-view>\n</script>\n\n<script id=\"facts2.html\" type=\"text/ng-template\">\n  <ion-view title=\"Also Factual\">\n    <ion-content class=\"padding\">\n      <p>111,111,111 x 111,111,111 = 12,345,678,987,654,321</p>\n      <p>1 in every 4 Americans has appeared on T.V.</p>\n      <p>11% of the world is left-handed.</p>\n      <p>1 in 8 Americans has worked at a McDonalds restaurant.</p>\n      <p>$283,200 is the absolute highest amount of money you can win on Jeopardy.</p>\n      <p>101 Dalmatians, Peter Pan, Lady and the Tramp, and Mulan are the only Disney cartoons where both parents are present and don't die throughout the movie.</p>\n      <p>\n        <a class=\"button icon ion-home\" href=\"#/tab/home\"> Home</a>\n        <a class=\"button icon ion-chevron-left\" href=\"#/tab/facts\"> Scientific Facts</a>\n      </p>\n    </ion-content>\n  </ion-view>\n</script>\n\n<script id=\"about.html\" type=\"text/ng-template\">\n  <ion-view title=\"About\">\n    <ion-content class=\"padding\">\n      <h3>Create hybrid mobile apps with the web technologies you love.</h3>\n      <p>Free and open source, Ionic offers a library of mobile-optimized HTML, CSS and JS components for building highly interactive apps.</p>\n      <p>Built with Sass and optimized for AngularJS.</p>\n      <p>\n        <a class=\"button icon icon-right ion-chevron-right\" href=\"#/tab/navstack\">Tabs Nav Stack</a>\n      </p>\n    </ion-content>\n  </ion-view>\n</script>\n\n<script id=\"nav-stack.html\" type=\"text/ng-template\">\n  <ion-view title=\"Tab Nav Stack\">\n    <ion-content class=\"padding\">\n      <p><img src=\"http://ionicframework.com/img/diagrams/tabs-nav-stack.png\" style=\"width:100%\"></p>\n    </ion-content>\n  </ion-view>\n</script>\n\n<script id=\"contact.html\" type=\"text/ng-template\">\n  <ion-view title=\"Contact\">\n    <ion-content>\n      <p>@IonicFramework</p>\n      <p>@DriftyCo</p>\n    </ion-content>\n  </ion-view>\n</script>"
  }
};


angular.module('tabsAndNavigation'
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
      .val(['<html ng-app="tabsAndNavigation">',
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

