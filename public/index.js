// index.js

angular.module('myDay', []).controller('MyDayController', function($scope) {
    console.log($scope);
    $scope.taskList = [
    { 
        id: "1",
        title: "Write the UI",
        context: "next week from gmail",
        completed: false
    },
    {
        id: "2",
        title: "Fix up the back end",
        context: "tomorrow from github",
        completed: true
    }];

    $scope.inbox = [
    {
        id: "3",
        title: "make an account to meet cuties",
        context: "yesterday from sms"
    },
    {
        id: "4",
        title: "take a good pic with the shark",
        context: "last week from gmail"
    }
    ]

});
