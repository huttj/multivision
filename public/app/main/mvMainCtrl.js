angular.module('app').controller('mvMainCtrl', function($scope) {
    $scope.courses = [
        {
            name: 'C# for Sociopaths',
            featured: true,
            published: new Date()
        },
        {
            name: 'C# for Normal People',
            featured: false,
            published: new Date('11/12/2013')
        },
        {
            name: 'JavaScript for Everyone',
            featured: true,
            published: new Date('1/11/14')
        },
        {
            name: 'PowerShell Recipes',
            featured: true,
            published: new Date()
        },
        {
            name: 'Python Patterns',
            featured: false,
            published: new Date('4/12/2014')
        },
        {
            name: 'C# for Sociopaths',
            featured: false,
            published: new Date()
        },
        {
            name: 'WTF is Erlang',
            featured: false,
            published: new Date()
        },
        {
            name: 'Let\'s Go with Go',
            featured: true,
            published: new Date()
        }
    ];
});