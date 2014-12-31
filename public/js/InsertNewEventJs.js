/**
 * Created by 012-user on 12/31/2014.
 */
var ng_app = angular.module('InsertApp', []);


angular.module('InsertApp', []).controller('InsertCtrl', function($scope) {
    $scope.master = {};

    $scope.update = function(user) {
        $scope.master = angular.copy(user);
    };

    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };

    $scope.reset();


    $('#reservation').daterangepicker(null, function(start, end, label) {
        console.log(start.toISOString(), end.toISOString(), label);
    });
    $('#reservation').daterangepicker(
        {
            format: 'DD/MM/YYYY',
            endDate: Date.now()
        }
    );
});
