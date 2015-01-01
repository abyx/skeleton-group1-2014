/**
 * Created by 012-user on 12/31/2014.
 */


angular.module('app').controller('InsertCtrl', function($scope, $http, $location) {
    $scope.Event = {};

    $(document).ready(function() {
        $('#timeLineDatesRange').daterangepicker(null, function(start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
        });
        $('#timeLineDatesRange').daterangepicker(
            {
                format: 'DD/MM/YYYY',
                startDate: moment().subtract(180,'days').toDate(),
                endDate: moment().toDate(),
                singleDatePicker : true

            }
        );

        $('#timeLineDatesRange').on('apply.daterangepicker', function(ev, picker) {
            $scope.Event.startDate = picker.startDate;


        });
    });

    $scope.submitPost = function () {
        $http.post('/InsertNewATMEvent', $scope.Event).
            success(function(data) {
                alert("Success");
                $scope.Event = {};
            });
    };

    $scope.addNewMeeting = function () {
        alert($scope.Event.startDate);
        $http.post('/Meetings', $scope.Event).
            success(function(data) {
                alert("Success");
            });
    };

    $scope.getMeetings = function () {
        //alert($scope.Event.startDate);
        var formattedStartDate = $scope.Event.startDate.format('DD/MM/YYYY');
        var formattedEndDate = $scope.Event.endDate.format('DD/MM/YYYY');

        $http.get('/Meetings?startDate=' + formattedStartDate + '&endDate=' + formattedEndDate + '').
            success(function(data) {
                alert(data);
            });
    };



    /*
    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };

    $scope.reset();
    */
});


