var app = angular.module("app");


app.controller("mentorHome", function($scope, $window, $cookies, $http, $location)
{
    // Empty Object for View
    $scope.mentorData = {};

    $scope.goHome = function()
    {
        $window.location.href = "http://localhost:3000/#!/mentorHome";
    };

    $scope.go = function()
    {
        $window.location.href = "http://localhost:3000/#!/mentorAgenda";
    };

    $scope.goTeam = function()
    {
        $window.location.href = "http://localhost:3000/#!/teamPerformance";
    }
    
    // Will be Called when /mentorHome is initialized
    $scope.mentorInit = function()
    {
        //$scope.mentorData.id = $cookies.get('mentor');
        //console.log("Hi");   
        
        $scope.jsonObject = { "mentorId": $cookies.get('mentorId') }
        
        var url = "http://localhost:3010/mentor";
        var hpromise = $http.post(url, $scope.jsonObject);
        
        hpromise.then(function(response) 
        {
            //routing according to login
            console.log(response);
            $scope.mentorData.id = $cookies.get('mentorId');
            $scope.mentorData.userName = $cookies.get('mentorUserName');
            $scope.mentorData.name = response.data[0].mentorName;
            $scope.mentorData.yoe = response.data[0].yearOfExperience;
            $scope.mentorData.contact = response.data[0].contactNo;
            $scope.mentorData.company = response.data[0].company;
            $scope.mentorData.aoe = response.data[0].areaOfExpertise;
            $scope.mentorData.batch = response.data[0].batch;
            $scope.mentorData.email = response.data[0].email;
            $scope.mentorData.teamNo = response.data[0].teamId;

        }).catch(function(err) 
            {
              console.log(err);
            });        
 };  

    $scope.notify = function()
    {
        $("#notificationId").fadeIn(2000, function(){
        $("#notificationId").fadeOut(5000);
    });

    };

    $scope.performLogOut = function(){
        $cookies.remove("mentorId");
        $cookies.remove("type");
        $cookies.remove("mentorUserName");
        $location.path("/");
    };


});