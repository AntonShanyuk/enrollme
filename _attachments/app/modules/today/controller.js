app.controller('TodayController', function ($scope) {

    var startOfday = 8;
    var endOfDay = 21;
    var scaleDivision = .5;

    $scope.$on('$viewContentLoaded', function () {
        var now = moment();
        var startTime = moment({ hour: startOfday });;
        var elapsedHours = endOfDay - startOfday;

        var slots = [];
        for (var i = 0; i < elapsedHours; i += scaleDivision) {
            slots.push({
                startTime: moment(startTime).add(i, 'hours').format('HH:mm'),
                endTime: moment(startTime).add(i + scaleDivision, 'hours').format('HH:mm')
            });
        }

        $scope.slots = slots;
    });
});