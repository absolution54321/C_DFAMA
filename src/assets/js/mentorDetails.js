var app = angular.module("app");


app.controller("mentorDetails", function ($scope, $http, $location, $cookies) {

    $scope.custom = true;
    $scope.custom1 = true;

    var mentorDetailsList = [];
    $scope.mentorDetailsList = mentorDetailsList;
    $scope.modalMentor = {};

    $scope.toggleMarks = function () {
        $scope.custom = $scope.custom === false ? true : false;
    }

    $scope.toggleData1 = function () {
        $scope.custom1 = $scope.custom1 === false ? true : false;
    }


    $scope.goToForum = function () {
        $location.path("/mentorDetails");
    };

    $scope.goToMentorDetails = function () {
        $location.path("/mentorDetails");
    };

    $scope.loadAllMentorsDetailsForAdminLogin = function () {
        var url = "http://localhost:3010/admin/mdetails/";
        var hpromise = $http.get(url);
        hpromise.then(function (response) {
            console.log(response.data);

            $scope.mentorDetailsList = response.data;

        }).catch(function (err) {
            console.log(err);
        });

    };

    $scope.listItemClicked = function (event) {
        var id = event.target.id;
        console.log(id);
        $cookies.put('listItemClicked', id);
        $location.path("/adminDisplaySpecificMarks");

    };
    $scope.go = function () {
        $location.path("/adminHome");
    };

    $scope.fetchMentor = function(obj){

       $scope.jsonObj = { "mentorId": $scope.modalMentor.mentorId};

       var url = "http://localhost:3010/mentor/";
        var hpromise = $http.post(url, $scope.jsonObj);
        hpromise.then(function (response) {
            console.log(response.data);

            $scope.modalMentor.teamId = response.data[0].teamId;
            $scope.modalMentor.mentorName = response.data[0].mentorName;
            $scope.modalMentor.yearOfExperience = response.data[0].yearOfExperience;
            $scope.modalMentor.contactNo = response.data[0].contactNo;
            $scope.modalMentor.company = response.data[0].company;
            $scope.modalMentor.areaOfExpertise = response.data[0].areaOfExpertise;
            $scope.modalMentor.batch = response.data[0].batch;
            $scope.modalMentor.email = response.data[0].email;

            //$(obj).parent().prev().children().last().attr('disabled');

        }).catch(function (err) {
            console.log(err);
        });

    };

    $scope.updateMentor = function()
    {

       var url = "http://localhost:3010/admin/mentorUpdate";
        var hpromise = $http.post(url, $scope.modalMentor);
        hpromise.then(function (response) {
            console.log(response.data);

            if(response.data.affectedRows > 0)
                {
                    alert("Changes Made");
                }

        }).catch(function (err) {
            console.log(err);
        });

    };

    $scope.performLogOut = function () {
        $cookies.remove("adminId");
        $cookies.remove("type");
        $cookies.remove("adminUserName");
        $location.path("/");
    };

    $scope.addModifylistItemClicked = function (event) {
        var id = event.target.id;
        if (id == '11') {
            $location.path("/adminModifyDetails");
        } else {
            $location.path("/adminUploadExcelSheet");

        }
    };

});