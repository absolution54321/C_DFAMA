var app = angular.module("app");


app.controller("adminExcelUpload", function ($scope, $location, $cookies, $http) {

    $scope.error = true;
    $scope.errorTwo = true;
    $scope.custom = true;
    $scope.custom1 = true;
    $scope.fileName = {};

    $scope.toggleMarks = function () {
        $scope.custom = $scope.custom === false ? true : false;
    };

    $scope.toggleData = function () {
        $scope.custom1 = $scope.custom1 === false ? true : false;
    };

    $scope.toggleData1 = function () {
        $scope.custom1 = $scope.custom1 === false ? true : false;
    }


    $scope.goToForum = function () {
        $location.path("/adminForum");
    };

    $scope.goToMentorDetails = function () {
        $location.path("/mentorDetails");
    };

    $scope.goToMarks = function(){

        $location.path("/adminStudentsMarks");

    };

    $scope.goToUpload = function(){

        $location.path("/adminExcelUpload");

    };

    $scope.loadAllSubjectWiseMarksForAdminLogin = function () {

        $scope.jsonObject = { "subjectName": $cookies.get('listItemClicked') }
        var url = "http://localhost:3010/admin/imarksdetails/";
        var hpromise = $http.post(url, $scope.jsonObject);
        hpromise.then(function (response) {
            console.log(response.data);

            $scope.marksList = response.data;

        }).catch(function (err) {
            console.log(err);
        });

    };

    $scope.validate_fileupload = function ($event) {
        var fileName = angular.element($event.currentTarget).val();
        $scope.fileName.file = angular.element($event.currentTarget).val();
        var allowed_extensions = "xlsx";
        var file_extension = fileName.split('.').pop();


        if (allowed_extensions == file_extension) {
            $scope.error = true;
            $scope.errorTwo = true;
            console.log("Correct Extension");
        }
        else{
        $scope.error = false;
        $scope.errorTwo = false;
        console.log("Wrong Extension");
        }
    };

    $scope.upload = function(){

        var url = "http://localhost:3010/admin/uploadStudentLogin/";
        var hpromise = $http.post(url, $scope.fileName);
        hpromise.then(function (response) {
            console.log(response.data);


        }).catch(function (err) {
            console.log(err);
        });
    };


    $scope.listItemClicked = function (event) {
        var id = event.target.id;
        console.log(id);
        $cookies.put('listItemClicked', id);
        $scope.loadAllSubjectWiseMarksForAdminLogin();

    };

    $scope.goHome = function () {
        $location.path("/adminHome");
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

