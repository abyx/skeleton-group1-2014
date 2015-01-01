angular.module('app').controller('HomeCtrl',function($scope) {
  $scope.greeting = 'World';
  $scope.query = {};

  $scope.model = {
    text: ''
  };

  //$scope.startDate = moment().substact(3,'months').toDate();
  //$scope.endDate = new Date(Date.now());
  $scope.errorMsg = "";

  $(document).ready(function() {
    $('#timeLineDatesRange').daterangepicker(null, function(start, end, label) {
      console.log(start.toISOString(), end.toISOString(), label);
    });
    $('#timeLineDatesRange').daterangepicker(
        {
          format: 'DD/MM/YYYY',
          startDate: moment().subtract(180,'days').toDate(),
          endDate: moment().toDate()

        }
    );

    $('#timeLineDatesRange').on('apply.daterangepicker', function(ev, picker) {
      $scope.query.startDate = picker.startDate;
      $scope.query.endDate = picker.endDate;
    });
  });

  $scope.UpdateTimeline= function() {
    document.getElementById('TimeLineIframe').contentWindow.location.reload();
    setTimeout(function(){
      document.getElementById('TimeLineIframe').contentWindow.InitTimeLine($scope.query);

    }, 1000);

  };

  $scope.validation=function() {
    if ($scope.query.startDate != undefined && $scope.query.endDate != undefined) {
      if ($scope.query.startDate > $scope.query.endDate) {
        $scope.errorMsg = 'The end date cannot be earlier than the start date !'
      }
      else
      {
        $scope.errorMsg = "";
      }
    }
  }


  $scope.dateChanged=function() {
    $scope.query.startDate = $('#timeLineDatesRange').startDate;
    $scope.query.endDate = $('#timeLineDatesRange').endDate;

    if ($scope.query.startDate != undefined && $scope.query.endDate != undefined) {
      if ($scope.query.startDate > $scope.query.endDate) {
        $scope.errorMsg = 'The end date cannot be earlier than the start date !'
      }
      else
      {
        $scope.errorMsg = "";

        var startDate = $scope.query.startDate.getFullYear().toString() + ',' + ($scope.query.startDate.getMonth() + 1).toString() + ',' +$scope.query.startDate.getDate().toString();
        var endDate = $scope.query.endDate.getFullYear().toString() + ',' + ($scope.query.endDate.getMonth() + 1).toString() + ',' +$scope.query.endDate.getDate().toString();

        // Get date and init timeline
        document.getElementById('TimeLineIframe').contentWindow.InitTimeLine($scope.query);
      }
    }
  }

  $scope.buttonClicked = function() {
    if ($scope.model.text === '') {
      alert('Please enter text in the input field');
    } else {
      alert('Heya, ' + $scope.model.text);
    }
  };
})
    .filter('betweenDate', function() {
      return function (items, startDate, endDate) {
        return items.filter(function (item) {
          //console.log(item, new Date(item.Date));
          return new Date(item.Date) >= startDate && new Date(item.Date) <= endDate;
        })
      }
    });




