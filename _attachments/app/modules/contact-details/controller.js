app.controller('ContactDetailsController', function ($scope, $routeParams, $modal, $location, $timeout, Contacts) {
    $scope.id = $routeParams.id;
    $scope.$on('$viewContentLoaded', function (event) {
        Contacts.get($scope.id).then(function (contact) {
            $scope.contact = contact;
        });
    });

    $scope.delete = function () {
        var dialog = $modal.open({
            templateUrl: 'app/modules/confirm/view.html',
            controller: 'ConfirmController',
            resolve: {
                localization: function () {
                    return {
                        question: 'Are you sure you want to delete this contact?',
                        ok: 'Yes, I\'m sure',
                        no: 'No, thanks'
                    };
                }
            },
            size: 'sm'
        });

        dialog.result.then(function () {
            Contacts.delete($scope.contact._id, $scope.contact._rev).then(function () {
                $location.path('/contacts');
            });
        });
    };

    $scope.renamingOk = false;

    $scope.update = function () {
        Contacts.put($scope.contact).then(function () {
            $scope.renamingOk = true;
            $timeout(function () {
                $scope.renamingOk = false;
            }, 500);
        });
    };


});