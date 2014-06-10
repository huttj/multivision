angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/main',
            controller: 'mvMainCtrl'
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/user-list',
            controller: 'mvUserListCtrl',
            resolve: {
                auth: function($q, mvIdentity) {
                    if(mvIdentity.hasRole('admin')) {
                        return true;
                    } else {
                        return $q.reject('user not authorized');
                    }
                }
            }
        })

});

// Run tells it to run the code after the app has been fully configured/initialized
angular.module('app').run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
        if(rejection === 'user not authorized') {
            $location.path('/');
        }
    });
});