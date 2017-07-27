var app = angular.module("app");

app.controller("teamPerformance", function ($scope, $window, $http, $cookies, $location) {
    $scope.teamList = [];
    $scope.teamPerformanceList = [];
    $scope.teamDetails = {};

    $scope.goHome = function () {
        $window.location.href = "http://localhost:3000/#!/mentorHome";
    };

    $scope.go = function () {
        $window.location.href = "http://localhost:3000/#!/mentorAgenda";
    };

    // $scope.goTeam = function () {
    //     $window.location.href = "http://localhost:3000/#!/teamPerformance";
    // };


    $scope.calculateTeamPerformance = function(){
        var url = "http://localhost:3010/mentor/calcTeamPerformance/";

        var hpromise = $http.get(url);
   
        hpromise.then(function (response) {
            console.log(response);

            
        if (response.data.length > 0) {
                for (var i = 0; i < response.data.length; i++) {
                   var add = response.data[i].AJLS+response.data[i].AJMS+ response.data[i].ALS + response.data[i].AMS+response.data[i].AWLS+ response.data[i].AWMS+ response.data[i].CJLS+ response.data[i].CJMS+ response.data[i].CLS+ response.data[i].CMS+ response.data[i].DBLS+ response.data[i].DBMS+ response.data[i].DNLS+ response.data[i].DNMS+ response.data[i].OLS+ response.data[i].OMS+ response.data[i].SLS+ response.data[i].SMS;
                   $scope.teamPerformanceList.push(add);
            }
         }

         
        }).catch(function (err) {
            console.log(err);
        });


    }

    $scope.teamInit = function () {
        $scope.jsonObj = { "mentorId": $cookies.get('mentorId') };

        //console.log($scope.jsonObj.mentorId);

        var url = "http://localhost:3010/mentor/team";
        var hpromise = $http.post(url, $scope.jsonObj);

        hpromise.then(function (response) {
            console.log(response);
            if (response.data.length > 0) {
                for (var i = 0; i < response.data.length; i++) {
                    $scope.teamList.push({
                        "rank": response.data[i].rank,
                        "name": response.data[i].name,
                        "yearofpassing": response.data[i].yearofpassing,
                        "qualification": response.data[i].qualification
                    });
                }
            }
            
            $scope.teamDetails.groupName = response.data[0].groupName;
            $scope.teamDetails.teamId = response.data[0].teamId;

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