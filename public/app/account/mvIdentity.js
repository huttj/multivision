angular.module('app').factory('mvIdentity', function($window, mvUser) {
    var currentUser;
    if ($window.preload && $window.preload.bootstrappedUserObject) {
        currentUser = new mvUser();
        angular.extend(currentUser, $window.preload.bootstrappedUserObject);
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function() {
            return !!this.currentUser;
        }
    };
});