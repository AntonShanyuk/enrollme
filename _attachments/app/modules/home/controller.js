app.controller('HomeController', function ($scope) {
    $scope.dayOfWeek = moment().format('dddd');
    $scope.dayOfMonth = moment().format('D');
    $scope.month = moment().format('MMMM');
    $scope.startOfWeek = moment().startOf('isoweek').format('MMMM Do');
    $scope.endOfWeek = moment().endOf('isoweek').format('MMMM Do');
});