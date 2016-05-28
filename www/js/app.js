// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ionic-material'])

.factory('qwCache', function($cacheFactory){
//  return $cacheFactory('qwCacheData');
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    if(typeof analytics !== undefined) {
          // No lugar de "UA-XXXXXXXX-XX" você deve colocar o seu tracking id
          cordova.plugins.analytics.startTrackerWithId("UA-59894750-1");
          cordova.plugins.analytics.trackView("APP QueroWorkar");

      } else {
          console.log("Google Analytics indisponível");
      }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs-menu.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'JobsDaily'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'menuContent': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'BlogDaily'
        }
      }
    })

    .state('tab.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html',
          controller: 'JobsDaily'
        }
      }
    })

    .state('tab.contact', {
      url: '/contact',
      views: {
        'menuContent': {
          templateUrl: 'templates/contact.html',
          controller: 'Contact'
        }
      }
    })

	.state('tab.jobs-detail', {
      url: '/jobs/:jobsId',
      views: {
        'menuContent': {
          templateUrl: 'templates/jobs-detail.html',
          controller: 'JobDetails'
        }
      }
    })

	.state('tab.post-detail', {
      url: '/post/:postId',
      views: {
        'menuContent': {
          templateUrl: 'templates/post-detail.html',
          controller: 'PostDetails'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

})

/*.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
}) */

.filter('dateFormat', function($filter){
 return function(input){
  if(input == null){ return ""; }

  var _date = $filter('date')(new Date(input), 'dd/MM/yy');

  return _date.toUpperCase();

 };
})

.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);
