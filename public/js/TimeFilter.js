angular.module('app').controller('View1Ctrl', function($scope, ItemsModel) {
    $scope.items = ItemsModel.getItems();
    $scope.startDate = new Date(Date.now());
    $scope.endDate = new Date(Date.now());
}).filter('betweenDate', function() {
    return function (items, startDate, endDate) {
        return items.filter(function (item) {
            console.log(item, new Date(item.Date));
            return new Date(item.Date) >= startDate && new Date(item.Date) <= endDate;
        })
    }
})
.factory('ItemsModel', function(){
    var items = [
        {id: 1, Date:'08/01/2013', img:'http://onehungrymind.com/images/image00.jpg'},
        {id: 2, Date:'09/01/2013', img:'http://onehungrymind.com/images/image01.jpg'},
        {id: 3, Date:'10/01/2013', img:'http://onehungrymind.com/images/image02.jpg'},
        {id: 4, Date:'11/01/2013', img:'http://onehungrymind.com/images/image03.jpg'},
        {id: 5, Date:'12/01/2013', img:'http://onehungrymind.com/images/image04.jpg'},
        {id: 6, Date:'01/01/2014', img:'http://onehungrymind.com/images/image00.jpg'},
        {id: 7, Date:'02/01/2014', img:'http://onehungrymind.com/images/image01.jpg'},
        {id: 8, Date:'03/01/2014', img:'http://onehungrymind.com/images/image02.jpg'},
        {id: 9, Date:'04/01/2014', img:'http://onehungrymind.com/images/image03.jpg'},
        {id: 10, Date:'05/01/2014', img:'http://onehungrymind.com/images/image04.jpg'},
        {id: 11, Date:'06/01/2014', img:'http://onehungrymind.com/images/image00.jpg'},
        {id: 12, Date:'07/01/2014', img:'http://onehungrymind.com/images/image01.jpg'},
        {id: 13, Date:'08/01/2014', img:'http://onehungrymind.com/images/image02.jpg'},
        {id: 14, Date:'09/01/2014', img:'http://onehungrymind.com/images/image03.jpg'},
        {id: 15, Date:'10/01/2014', img:'http://onehungrymind.com/images/image04.jpg'}
    ];
    return {
        getItems : function() { return items;}
    };
    });
