app.controller('ContactsController', function ($scope, $location, Contacts) {
    $scope.contacts = [];
    $scope.input = '';
    $scope.activeContact = null;
    loadContacts($scope, Contacts);
    $scope.submit = function () {
        if (!$scope.contacts.length) {
            var contact = { name: $scope.input };
            Contacts.post(contact).$promise.then(function (response) {
                $scope.contacts.splice(0, 0, contact);
                loadContacts($scope, Contacts);
            });
        } else {
            $scope.goToDetails($scope.activeContact);
        }
    }

    $scope.timeout = null;
    $scope.change = function () {
        if ($scope.timeout) {
            window.clearTimeout($scope.timeout);
        }
        $scope.timeout = window.setTimeout(function () {
            loadContacts($scope, Contacts);
        }, 200);
    };

    $scope.goToDetails = function (contact) {
        $location.path('/contact/' + contact._id);
    };

    $scope.keyup = function (event) {
        switch (event.keyCode) {
            case 40: // down
                var nextContact = $scope.activeContact.nextContact;
                if (!nextContact) {
                    nextContact = $scope.contacts[0];
                }
                $scope.activeContact = nextContact;
                break;
            case 38: // up
                var previousContact = $scope.activeContact.previousContact;
                if (!previousContact) {
                    previousContact = $scope.contacts[$scope.contacts.length - 1];
                }
                $scope.activeContact = previousContact;
                break;
            default:
                break;
        }
    };

    $scope.setActive = function (contact) {
        $scope.activeContact = contact
    };
});

function loadContacts($scope, Contacts) {
    Contacts.query({ name: $scope.input }).$promise.then(function (data) {
        $scope.contacts = data.rows;
        $scope.activeContact = $scope.contacts[0];
    });
}