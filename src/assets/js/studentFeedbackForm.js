var app = angular.module("app");


app.controller("studentFeedbackForm", function ($scope, $location, $http, $cookies) {

  $scope.feedbackData = {};

  $scope.inputData = {};

  var mentorid;
  $scope.getMentorId = function () {
    $scope.jsonObject = { "studentId": $cookies.get('studentId') };
    var url = "http://localhost:3010/student";
    var hpromise = $http.post(url, $scope.jsonObject);

    hpromise.then(function (response) {
      console.log(response);
      mentorid = response.data[0].mentorId;
    }).catch(function (err) {
      console.log(err);
    });
  };
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
    $location.path("/studentForum");
  };

  $scope.performLogOut = function () {
    $cookies.remove("studentId");
    $cookies.remove("type");
    $cookies.remove("studentUserName");
    $location.path("/");
  };

  $scope.submitFeedback = function () {
     $scope.inputData = {
      "sid": $scope.feedbackData.studentId,
      "mid": mentorid,
      "one": $scope.feedbackData.one,
      "two": $scope.feedbackData.two,
      "three": $scope.feedbackData.three,
      "four": $scope.feedbackData.four,
      "five": $scope.feedbackData.five,
      "six": $scope.feedbackData.six,
      "review": $scope.feedbackData.comment
    };

    var url = "http://localhost:3010/studentFeedback";
    var hpromise = $http.post(url, $scope.inputData);

    hpromise.then(function (response) {
      console.log(response);
      alert("Feedback added successfully");
      $location.path("/studentHome");
    }).catch(function (err) {
      console.log(err);
      alert("There is Some problem to add Feedback, try after some time");
      $location.path("/studentHome");
    });
  }
});