angular.module('app', ['ngRoute']);

angular.module('app').config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home.html',
      controller: 'HomeCtrl'
    })
    .when('/view1/:argument?', {
      templateUrl: 'view1.html',
      controller: 'View1Ctrl'
    })
    .when('/view2', {
      templateUrl: 'view2.html',
      controller: 'View2Ctrl'
    })
    .when('/InsertNewEvent', {
      templateUrl: 'InsertNewEvent.html'
    })
    .otherwise({redirectTo: '/'});
});
