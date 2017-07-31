var app = angular.module("app");


app.controller("mentorAgenda", function ($scope, $window, $compile, $filter, $http, $cookies, $location) {
    $scope.postList = [];
    $scope.posts = {};

    $scope.editPost = {};

    $scope.fetch = function () {
        $window.location.href = "https://www.google.co.in/";
    };

    $scope.goHome = function () {
        $window.location.href = "http://localhost:3000/#!/mentorHome";
    };

    $scope.go = function () {
        $window.location.href = "http://localhost:3000/#!/mentorAgenda";
    };

    $scope.goTeam = function () {
        $window.location.href = "http://localhost:3000/#!/teamPerformance";
    };

    $scope.goToForum = function () {
        $window.location.href = "http://localhost:3000/#!/mentorForum";
        
    };



    $scope.setAgenda = function () {
        //$scope.posts.agendaDate = new Date($scope.posts.agendaDate);
        if ($scope.posts.agendaText) {
            if ($scope.posts.agendaDate) {
                $scope.posts.agendaDate = $filter('date')($scope.posts.agendaDate, "dd-MM-yyyy"); // for conversion to string
                $scope.postList.push({ "agendaText": $scope.posts.agendaText, "agendaDate": $scope.posts.agendaDate });

                $scope.jsonObj = {
                    "mentorId": $cookies.get('mentorId'),
                    "agendaText": $scope.posts.agendaText,
                    "agendaDate": $scope.posts.agendaDate
                };

                var url = "http://localhost:3010/mentor/agenda";
                var hpromise = $http.post(url, $scope.jsonObj);

                hpromise.then(function (response) {
                    console.log(response);

                }).catch(function (err) {
                    console.log(err);
                });
            }
        }
        else {
            alert("Please Enter both Values");
        }

    };

    $scope.agendaInit = function () {
        $scope.jsonObj = { "mentorId": $cookies.get('mentorId') };

        var url = "http://localhost:3010/mentor/agendaInit";
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

    $scope.setEvent = function ($event) {

        $scope.editPost.currentAgenda = angular.element($event.currentTarget).parent().children().first().val();

    };

    $scope.updateAgenda = function () {

        var url = "http://localhost:3010/mentor/updateAgenda"

        var hpromise = $http.post(url, $scope.editPost);

        hpromise.then(function (response) {

            if (response.data.affectedRows > 0) {
                console.log(response.data);
            }

            $location.path("/mentorAgenda");

        }).catch(function (err) {
            console.log(err);
        });

    };

    $scope.performLogOut = function () {
        $cookies.remove("mentorId");
        $cookies.remove("type");
        $cookies.remove("mentorUserName");
        $location.path("/");
    };
});