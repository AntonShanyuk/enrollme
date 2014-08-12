app.controller('ContactsController', function ($scope, $location) {
    $scope.contacts = [];
    $scope.input = { content: '' };
    $scope.selected = function (contact) {
        $location.path('/contact/' + contact._id);
    };
});