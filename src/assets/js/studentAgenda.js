var app = angular.module("app");


app.controller("studentAgenda", function ($scope, $window, $compile, $filter, $http, $cookies, $location) {
    $scope.postList = [];

    $scope.goToStudentAgendaPage = function () {
        $location.path("/studentAgenda");
    };

    $scope.goToStudentHomePage = function () {
        $location.path("/studentHome");
    };

    $scope.goToStudentMarksTablePage = function () {
        $location.path("/studentMarksTable");
    };

    $scope.goTostudentFeedbackForm = function () {
        $location.path("/studentFeedbackForm");
    };

    $scope.goToForum = function () {
        $location.path("/forum");
    };

    $scope.agendaInit = function () {
        $scope.jsonObj = { "studentId": $cookies.get('studentId') };

        var url = "http://localhost:3010/student/agendaInit";
        var hpromise = $http.post(url, $scope.jsonObj);

        hpromise.then(function (response) {
            console.log(response);

            if (response.data.length > 0) {
                for (var i = 0; i < response.data.length; i++) {
                    $scope.postList.push({
                        "agendaText": response.data[i].agenda_Details,
                        "agendaDate": response.data[i].scheduleTime
                    });
                }

            }

        }).catch(function (err) {
            console.log(err);
        });
    };

    $scope.performLogOut = function () {
        $cookies.remove("studentId");
        $cookies.remove("type");
        $cookies.remove("studentUserName");
        $location.path("/");
    };
});