// I named this stupid file wrong...
angular.module('app').controller('mvNavbarLoginCtrl', function($scope, $http, mvIdentity, mvNotifier, mvAuth, $location) {
    $scope.identity = mvIdentity;
    $scope.signin = function(username, password) {
        mvAuth.authenticateUser(username, password).then(mvNotifier.success, mvNotifier.warn);
    };
    $scope.signout = function() {
        mvAuth.logoutUser().then(function(msg) {
            $scope.username = "";
            $scope.password = "";
            mvNotifier.success(msg);
            $location.path('/');
        });
    }
});