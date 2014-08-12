angular.module('pas')

.controller('RootCtrl',
  function() {}
)

.controller('LoginCtrl',
  function($scope, $state) {
    angular.extend($scope, {
      login: function() {
        $scope.loggingIn = true

        Parse.User.logIn($scope.userEmail, $scope.userPassword).then(
          function success() {
            $scope.loggingIn = false
            $state.go('dashboard')
          },

          function error() {
            $scope.loginError = true
            $scope.loggingIn = false
            console.log(arguments)
          }
        )
      }
    })
  }
)

.controller('SignupCtrl',
  function($scope) {
    angular.extend($scope, {
      signup: function() {
        var user = new Parse.User()

        user.set('username', $scope.userEmail)
        user.set('email', $scope.userEmail)
        user.set('password', $scope.userPassword)

        user.signUp().then(
          function success() {
            $scope.signupSuccess = true
          },

          function error() {
            $scope.signupError = true
            console.log(arguments)
          }
        )
      }
    })
  }
)

.controller('DashboardCtrl',
  function($scope, $state, cbs) {
    var currentUser = Parse.User.current()

    if (currentUser === null) {
      $state.go('login')
    } else {
      currentUser.fetch()

      angular.extend($scope, {
        userIsLoggedIn: true,

        apps: [
          { name: 'App 1' },
          { name: 'App 2' },
          { name: 'App 3' },
        ],

        addApp: function(app) {
          currentUser.addUnique('apps', app)

          currentUser.save().then(cbs.success, cbs.error)
        },

        userApps: function() {
          return currentUser.get('apps')
        },

        removeApp: function(app) {
          currentUser.set('apps', _.reject(currentUser.get('apps'), { name: app.name }))

          currentUser.save().then(cbs.success, cbs.error)
        },

        logout: function() {
          Parse.User.logOut()

          $state.go('login')
        }
      })
    }
  }
)