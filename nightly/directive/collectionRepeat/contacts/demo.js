var DEMO;

  DEMO = {
  "module": "collectionRepeatContacts",
  "name": "contacts",
  "docName": "collectionRepeat",
  "href": "/nightly/directive/collectionRepeat/contacts",
  "javascript": {
    "path": "nightly/directive/collectionRepeat/contacts/javascript.js",
    "content": "angular.module('collectionRepeatContacts', ['ionic'])\n.controller('ContactsCtrl', function($scope, $ionicScrollDelegate, $http, $ionicLoading) {\n  var contacts = $scope.contacts = [];\n  var currentCharCode = 'A'.charCodeAt(0) - 1;\n\n  $ionicLoading.show({\n    template: 'Fetching Contacts...'\n  });\n\n  $http.get('/contacts.json').then(function(response) {\n    $ionicLoading.hide();\n    response.data.sort(function(a, b) {\n      return a.last_name > b.last_name ? 1 : -1;\n    })\n    .forEach(function(person) {\n      //Get the first letter of the last name, and if the last name changes\n      //put the letter in the array\n      var personCharCode = person.last_name.toUpperCase().charCodeAt(0);\n      //We may jump two letters, be sure to put both in\n      //(eg if we jump from Adam Bradley to Bob Doe, add both C and D)\n      var difference = personCharCode - currentCharCode;\n      for (var i = 1; i <= difference; i++) {\n        addLetter(currentCharCode + i);\n      }\n      currentCharCode = personCharCode;\n      contacts.push(person);\n    });\n\n    //If names ended before Z, add everything up to Z\n    for (var i = currentCharCode + 1; i <= 'Z'.charCodeAt(0); i++) {\n      addLetter(i);\n    }\n  });\n\n  function addLetter(code) {\n    var letter = String.fromCharCode(code);\n    contacts.push({\n      isLetter: true,\n      letter: letter\n    });\n  }\n\n  //Letters are shorter, everything else is 100 pixels\n  $scope.getItemHeight = function(item) {\n    return item.isLetter ? 40 : 100;\n  };\n\n  $scope.scrollBottom = function() {\n    $ionicScrollDelegate.scrollBottom(true);\n  };\n\n  $scope.scrollTop = function() {\n    $ionicScrollDelegate.scrollTop();\n  };\n\n  var letterHasMatch = {};\n  $scope.getContacts = function() {\n    letterHasMatch = {};\n    //Filter contacts by $scope.search.\n    //Additionally, filter letters so that they only show if there\n    //is one or more matching contact\n    return contacts.filter(function(item) {\n      var itemDoesMatch = !$scope.search || item.isLetter ||\n        item.first_name.toLowerCase().indexOf($scope.search.toLowerCase()) > -1 ||\n        item.last_name.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;\n\n      //Mark this person's last name letter as 'has a match'\n      if (!item.isLetter && itemDoesMatch) {\n        var letter = item.last_name.charAt(0).toUpperCase();\n        letterHasMatch[letter] = true;\n      }\n\n      return itemDoesMatch;\n    }).filter(function(item) {\n      //Finally, re-filter all of the letters and take out ones that don't\n      //have a match\n      if (item.isLetter && !letterHasMatch[item.letter]) {\n        return false;\n      }\n      return true;\n    });\n  };\n\n  $scope.clearSearch = function() {\n    $scope.search = '';\n  };\n});\n"
  },
  "html": {
    "path": "nightly/directive/collectionRepeat/contacts/html.html",
    "content": "<div ng-controller=\"ContactsCtrl\">\n  <ion-header-bar class=\"bar-positive\">\n    <h1 class=\"title\">1000 Contacts</h1>\n    <div class=\"button\" ng-click=\"scrollBottom()\">\n      Bottom\n    </div>\n  </ion-header-bar>\n  <ion-header-bar class=\"bar-light bar-subheader\">\n    <input type=\"search\"\n      placeholder=\"Filter contacts...\"\n      ng-model=\"search\"\n      ng-change=\"scrollTop()\">\n    <button ng-if=\"search.length\"\n      class=\"button button-icon ion-android-close input-button\"\n      ng-click=\"clearSearch()\">\n    </button>\n  </ion-header-bar>\n  <ion-content>\n    <div class=\"list\">\n      <a class=\"item contact-item\"\n        collection-repeat=\"item in getContacts()\"\n        collection-item-height=\"getItemHeight(item)\"\n        collection-item-width=\"100 + '%'\"\n        ng-style=\"{'line-height': getItemHeight(item) + 'px'}\"\n        ng-class=\"{'item-divider': item.isLetter}\">\n        <img ng-if=\"!item.isLetter\" ng-src=\"http://placekitten.com/60/{{55 + ($index % 10)}}\">\n        {{item.letter || (item.first_name+' '+item.last_name)}}\n      </a>\n    </div>\n  </ion-content>\n</div>\n"
  },
  "css": {
    "path": "nightly/directive/collectionRepeat/contacts/css.css",
    "content": ".button.button-icon.input-button {\n  position: absolute;\n  right: 0;\n  top: 5px;\n  color: #bbb;\n}\n.list .item.contact-item img {\n  height: 60px;\n  width: 60px;\n  float: left;\n  margin-top: 20px;\n  margin-right: 10px;\n}\n.list .item.contact-item {\n  left: 0;\n  right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n}"
  }
};


angular.module('collectionRepeatContacts'
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
      .val(['<html ng-app="collectionRepeatContacts">',
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

