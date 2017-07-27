var app = angular.module("app");

// Empty Object for View



app.controller("studentHome", function ($scope, $location, $cookies, $http) {

    $scope.studentData = {};

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
    
    $scope.performLogOut = function () {
        $cookies.remove("mentorId");
        $cookies.remove("mentorUserName");
        $location.path("/");
    };

    $scope.studentInit = function () {
        //$scope.mentorData.id = $cookies.get('mentor');
        //console.log("Hi");   

        $scope.jsonObject = { "studentId": $cookies.get('studentId') }

        var url = "http://localhost:3010/student";
        var hpromise = $http.post(url, $scope.jsonObject);

        hpromise.then(function (response) {
            //routing according to login
            console.log(response);
            $scope.studentData.id = $cookies.get('studentId');
            $scope.studentData.userName = $cookies.get('studentUserName');
            $scope.studentData.name = response.data[0].name;
            $scope.studentData.rank = response.data[0].rank;
            $scope.studentData.address = response.data[0].address;
            $scope.studentData.contactNo = response.data[0].contactNo;
            $scope.studentData.dateofbirth = response.data[0].dateofbirth;
            $scope.studentData.yearofpassing = response.data[0].yearofpassing;
            $scope.studentData.qualification = response.data[0].qualification;
            $scope.studentData.mentorId = response.data[0].mentorId;
            $scope.studentData.studentId = response.data[0].studentId;
            $scope.studentData.gender = response.data[0].gender;
            $scope.studentData.teamId = response.data[0].teamId;
            $scope.studentData.batch = response.data[0].batch;
            $scope.studentData.state = response.data[0].state;
            $scope.studentData.parentContact = response.data[0].parentContact;


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


