// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic',
    'app.constants',
    //controllers
    'app.controller',
    'app.tab',
    'app.login',
    'app.scrumlog',
    'app.table',
    'app.submitScrumlog',
    'app.scrumlog-list',
    'app.scrumlogDetail',
    'app.student-list',
    'app.reviewStudent',
    'app.cycle',
    'app.add-cycle',
    'app.comment',
    'app.todo',
    'app.todo-detail',
    //services
    'app.scrumlogService',
    'app.interceptorService',
    'app.memeService',
    'app.authService',
    'app.tableService',
    'app.cycleService'
])

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

.value('api', 'http://localhost/scrumlog-web/api/api.php')
//.value('api', 'http://scrumlogtest.azurewebsites.net/scrumlog/index.php')
.value('tables', [1, 2, 3, 4, 5, 6, 7])

.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider, USER_ROLES) {

    $httpProvider.interceptors.push('myInterceptor');

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

    .state('tab-teacher', {
        url: '/tab-teacher',
        abstract: true,
        templateUrl: 'templates/tabs-teacher.html'
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
      },
      cache: false,
      data: {
          authorizedRoles: [USER_ROLES.student]
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
      },
      data: {
          authorizedRoles: [USER_ROLES.student]
      }
  })
    .state('tab.scrumlog', {
        url: '/scrumlog',
        views: {
            'tab-review-scrumlog': {
                templateUrl: 'templates/scrumlog.html',
                controller: 'ReviewScrumStudentCtrl'
                
            }
        },
        data: {
            authorizedRoles: [USER_ROLES.student]
        },
        params: {
            scrumlog: null
        }
    })

    .state('tab-teacher.review-scrumlog-teacher', {
        url: '/scrumlog-teacher',
        views: {
            'tab-review-scrumlog-teacher': {
                templateUrl: 'templates/tab-review-teacher.html',
                controller: 'ScrumlogCtrl'
            }
        },
        data: {
            authorizedRoles: [USER_ROLES.teacher]
        }
    })

    .state('tab-teacher.scrumlog-list', {
        url: '/scrumlog-list',
        views: {
            'tab-review-scrumlog-teacher': {
                templateUrl: 'templates/scrumlog-list.html',
                controller: 'ScrumlogListCtrl'
            }
        },
        data: {
            authorizedRoles: [USER_ROLES.teacher]
        },
        params: {
          scrumlogList: null
        }
    })

        .state('tab-teacher.scrumlog-detail', {
            url: '/scrumlog-list',
            views: {
                'tab-review-scrumlog-teacher': {
                    templateUrl: 'templates/scrumlog-detail.html',
                    controller: 'ScrumlogDetailCtrl'
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.teacher]
            },
            params: {
              scrumlog: null,
              studentId: null
            }
        })

    .state('tab-teacher.tab-table', {
        url: '/table',
        views: {
            'tab-table': {
                templateUrl: 'templates/tab-tables.html',
                controller: 'TableCtrl'
            }
        },
        data: {
            authorizedRoles: [USER_ROLES.teacher]
        }
    })

    .state('tab-teacher.student-list', {
        url: '/student-list/:table',
        views: {
            'tab-table': {
                templateUrl: 'templates/student-list.html',
                controller: 'StudentListCtrl'
            }
        },
        data: {
            authorizedRoles: [USER_ROLES.teacher]
        }
    })

    .state('tab-teacher.cycle', {
        url: '/cycle',
        views: {
            'tab-cycle': {
                templateUrl: 'templates/tab-cycle.html',
                controller: 'CycleCtrl'
            }
        },
        data: {
            authorizedRoles: [USER_ROLES.teacher]
        }
    })

    .state('tab-teacher.add-cycle', {
        url: '/add-cycle',
        views: {
            'tab-cycle': {
                templateUrl: 'templates/add-cycle.html',
                controller: 'AddCycleCtrl'
            }
        },
        data: {
            authorizedRoles: [USER_ROLES.teacher]
        },
        params: {
            cycle: null,
            index: null
        }
    })

    .state('tab-teacher.comment', {
      url: '/comment',
      views: {
          'tab-todo': {
              templateUrl: 'templates/comment.html',
              controller: 'CommentCtrl'
          }
      },
      data: {
          authorizedRoles: [USER_ROLES.teacher]
      },
      params: {
        comment: null,
        id: null
      }
    })

    .state('tab-teacher.todo', {
        url: '/todo',
        views: {
            'tab-todo': {
                templateUrl: 'templates/tab-todo.html',
                controller: 'TodoCtrl'
            }
        },
        data: {
            authorizedRoles: [USER_ROLES.teacher]
        }
    })
    
    .state('tab-teacher.todo-detail', {
        url: '/todo',
        views: {
            'tab-todo': {
                templateUrl: 'templates/todo-detail.html',
                controller: 'TodoDetailCtrl'
            }
        },
        data: {
            authorizedRoles: [USER_ROLES.teacher]
        },
        params: {
            todo: null
        }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

})

.run(function ($rootScope, $state, AuthService) {
    $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
        if ('data' in next && 'authorizedRoles' in next.data) {
            var authorizedRoles = next.data.authorizedRoles;
            if (!AuthService.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                $state.go('login');
            }
        }
        if (!AuthService.isAuthenticated) {
            if (next.name !== 'login') {
                event.preventDefault();
                $state.go('login');
            }
        }
    })
})
