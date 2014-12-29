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

  $scope.buttonClicked = function() {
    if ($scope.model.text === '') {
      alert('Please enter text in the input field');
    } else {
      alert('Heya, ' + $scope.model.text);
    }
  };


  $scope.TimeLineData = getDataForTimeLine;
  //alert($scope.TimeLineData[0].Event);

});



