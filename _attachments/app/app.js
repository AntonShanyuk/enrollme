String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
          ? args[number]
          : match
        ;
    });
};

var app = angular.module('enrollme', ['ngRoute', 'ngResource', 'ui.bootstrap']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/today', {
        controller: 'TodayController',
        templateUrl: 'app/modules/today/view.html'
    }).when('/home', {
        controller: 'HomeController',
        templateUrl: 'app/modules/home/view.html'
    }).when('/contacts', {
        controller: 'ContactsController',
        templateUrl: 'app/modules/contacts/view.html'
    }).when('/contact/:id', {
        controller: 'ContactDetailsController',
        templateUrl: 'app/modules/contact-details/view.html'
    }).otherwise({
        redirectTo: '/home'
    });
}]);

app.controller('MainController', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
});