var app = angular.module("app");


app.controller("forum", function ($scope, $window, $compile, $filter, $http, $cookies, $location) {

    $scope.goToHomePage = function () {
        var type = $cookies.getObject('type');
        if(type==1)
            $location.path("/adminHome");
        if(type==2)
            $location.path("/studentHome");
        if(type==3)
            $location.path("/mentorHome");
    };

    $scope.currentQuestion={};
    $scope.unansweredQuestions={};
    $scope.answeredQuestions={};

    $scope.postQuestion = function(){

    };

    $scope.answerQuestion = function(){

    };

    $scope.addToAnswers = function(){

    };

    $scope.postComment = function(){

    };

    $scope.addToComments = function(){

    };

    $scope.searchTagwise = function(){

    };

    $scope.searchDatewise = function(){

    };

    $scope.performLogOut = function () {
        $cookies.remove("studentId");
        $cookies.remove("type");
        $cookies.remove("studentUserName");
        $location.path("/");
    };

    $scope.forumInit = function(){

    };

    $scope.getforumUserName = function(){

    };

}); 