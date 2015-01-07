app.directive('contactsLookup', function () {
    return {
        restrict: 'E',
        templateUrl: './app/directives/contactsLookup/view.html',
        scope: {
            input: '=',
            contacts: '=',
            selected: '&',
            initialLoad: '&',
        },
        controller: function ($scope, $timeout, Contacts) {
            if ($scope.initialLoad) {
                loadContacts();
            }

            $scope.submit = function () {
                if (!$scope.contacts.length) {
                    var contact = { name: $scope.input.content };
                    Contacts.post(contact).then(function (response) {
                        $scope.contacts.splice(0, 0, contact);
                        loadContacts();
                    });
                } else {
                    $scope.selected({ contact: $scope.activeContact });
                }
            }

            $scope.timeout = null;
            $scope.change = function () {
                if ($scope.timeout) {
                    $timeout.cancel($scope.timeout);
                }
                $scope.timeout = $timeout(function () {
                    loadContacts();
                }, 200);
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

            $scope.contactClick = function (contact) {
                $scope.activeContact = contact;
                $scope.selected({ contact: contact });
            };

            function loadContacts() {
                Contacts.byName($scope.input.content).then(function (data) {
                    $scope.contacts = data;
                    $scope.activeContact = $scope.contacts[0];
                });
            }
        }
    }
});