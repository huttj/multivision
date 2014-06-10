angular.module('app').controller('mvUserListCtrl', function($scope, mvUser) {
    // Populate the user list
    $scope.users = mvUser.query();
});