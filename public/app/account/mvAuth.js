angular.module('app').factory('mvAuth', function($http, mvIdentity, $q, mvUser) {
    return {
        authenticateUser: function(username, password) {
            var deferred = $q.defer();
            $http.post('/login', {username: username, password: password}).then(function (res) {
                if (res.data.success) {
                    var user = new mvUser();
                    // Augment the user instance with the data collected:
                    angular.extend(user, res.data.user);
                    mvIdentity.currentUser = user;

                    deferred.resolve('You have been logged in as ' + username + '.');
                } else {
                    deferred.reject('Username or password incorrect.');
                }
            });
            return deferred.promise;
        },
        logoutUser: function() {
            var deferred = $q.defer();
            $http.post('/logout', {logout: true}).then(function() {
                mvIdentity.currentUser = undefined;
                deferred.resolve('You have been signed out.');
            });
            return deferred.promise;
        }
    };
});