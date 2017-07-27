var app = angular.module("app");


app.controller("studentMarksTable", function ($scope, $location, $http, $cookies) {

    // Empty Object for Marks
    $scope.studentMarks = {};

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


    // Will be Called when /studentMarksTable is initialized
    $scope.studentMarksInit = function () {
        // $scope.studentMarks.id = $cookies.get('student');
        // console.log("student");   

        $scope.jsonObject = { "studentId": $cookies.get('studentId') }

        var url = "http://localhost:3010/studentMarks";
        var hpromise = $http.post(url, $scope.jsonObject);

        hpromise.then(function (response) {
            //routing according to login
            console.log(response);
            $scope.studentMarks.cpp = response.data[0].oopcpp_Total;
            $scope.studentMarks.ds = response.data[0].alds_Total;
            $scope.studentMarks.os = response.data[0].osc_Total;
            $scope.studentMarks.j2se = response.data[0].j2se_Total;
            $scope.studentMarks.awp = response.data[0].awp_Total;
            $scope.studentMarks.j2ee = response.data[0].j2ee_Total;
            $scope.studentMarks.dbt = response.data[0].dbt_Total;
            $scope.studentMarks.se = response.data[0].se_Total;
            $scope.studentMarks.net = response.data[0].net_Total;

        }).catch(function (err) {
            console.log(err);
        });
    };
    $scope.performLogOut = function () {
        $cookies.remove("studentId");
        $cookies.remove("mentorId");
        $cookies.remove("type");
        $cookies.remove("studentUserName");
        $location.path("/");
    };
});