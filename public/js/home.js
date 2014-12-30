angular.module('app').factory('getDataForTimeLine', function(){
  return [
    { Event:"Zuk is waiking up early", Date:"11/12/2014" },
    { Event:"Zuk is sleeping", Date:"14/12/2014"}];
});

angular.module('app').controller('HomeCtrl',function($scope, getDataForTimeLine) {
  $scope.greeting = 'World';

  $scope.model = {
    text: ''
  };

  $scope.startDate = new Date(Date.now());
  $scope.endDate = new Date(Date.now());
  $scope.errorMsg = "";

  $scope.validation=function() {
    if ($scope.startDate != undefined && $scope.endDate != undefined) {
      if ($scope.startDate > $scope.endDate) {
        $scope.errorMsg = 'The end date cannot be earlier than the start date !'
      }
      else
      {
        $scope.errorMsg = "";
      }
    }
  }

  $scope.dateChanged=function() {
    if ($scope.startDate != undefined && $scope.endDate != undefined) {
      if ($scope.startDate > $scope.endDate) {
        $scope.errorMsg = 'The end date cannot be earlier than the start date !'
      }
      else
      {
        $scope.errorMsg = "";

        // Get date and init timeline
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


  $scope.TimeLineData = getDataForTimeLine;
  //alert($scope.TimeLineData[0].Event);

})
    .filter('betweenDate', function() {
      return function (items, startDate, endDate) {
        return items.filter(function (item) {
          //console.log(item, new Date(item.Date));
          return new Date(item.Date) >= startDate && new Date(item.Date) <= endDate;
        })
      }
    });



