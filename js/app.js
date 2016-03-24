// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.constants','app.controller',
    'app.tab','app.login', 'app.scrumlog', 'app.authService', 'app.submitScrumlog',
    'app.scrumlogService', 'app.interceptorService', 'app.memeService'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.value('api', 'http://localhost/scrumlog-api/index.php')
//.value('api', 'http://scrumlogtest.azurewebsites.net/scrumlog/index.php')

.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {

    $httpProvider.interceptors.push('myInterceptor');
    //$ionicConfigProvider.views.maxCache(0);

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
    })

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
    })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.submit-scrumlog', {
      url: '/submit-scrumlog',
      views: {
          'tab-submit-scrumlog': {
              templateUrl: 'templates/tab-submit-scrumlog.html',
              controller: 'SubmitScrumlogCtrl'
              
          }
      }
  })
  .state('tab.review-scrumlog', {
      url: '/review-scrumlog',
      views: {
          'tab-review-scrumlog': {
              templateUrl: 'templates/tab-review-scrumlog.html',
              controller: 'ScrumlogCtrl',
              controllerAs: 'vm'
          }
      }
  })
    .state('tab.scrumlog', {
        url: '/scrumlog',
        views: {
            'tab-review-scrumlog': {
                templateUrl: 'templates/scrumlog.html',
                controller: 'ScrumlogCtrl',
                controllerAs: 'vm'
            }
        }
    })

    .state('tab.review-scrumlog-teacher', {
        url: '/scrumlog-teacher',
        views: {
            'tab-review-scrumlog-teacher': {
                templateUrl: 'templates/tab-review-teacher.html',
                controller: 'ScrumlogCtrl',
                controllerAs: 'vm'
            }
        }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
