angular.module('pas', [
  'parse-angular',
  'ui.router'
])

.config(
  function($stateProvider) {
    Parse.initialize('0T6m09091iUuRcz3jkzr1zTMmneshlVCfI9tRcJW', 'g1bHEozCne1gfxWJr4GsRUdhwnWOLjBAY9jWzKTR')

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl:' signup.html',
        controller: 'SignupCtrl'
      })
      .state('dashboard', {
        url: '/',
        templateUrl: 'dashboard.html',
        controller: 'DashboardCtrl'
      })
})