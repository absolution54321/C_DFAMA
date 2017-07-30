var app = angular.module("app");


app.controller("adminStudentsMarks", function ($scope, $http, $location, $cookies) {

    $scope.custom = true;
    $scope.custom1 = true;
     $scope.data = {};
    

     $scope.insertStudentMarks = function () {
    console.log($scope.data);
    $scope.jsonObject = {
      "studentId":$scope.data.studentId,
      "cppLab": $scope.data.cppLab,
      "cppMcq": $scope.data.cppMcq,
      "cppTotal":(Number($scope.data.cppLab)+Number($scope.data.cppMcq)),
      "dsLab": $scope.data.dsLab,
      "dsMcq": $scope.data.dsMcq,
      "dsTotal":(Number($scope.data.dsLab)+Number($scope.data.dsMcq)),
       "osLab": $scope.data.osLab,
      "osMcq": $scope.data.osMcq,
      "osTotal":(Number($scope.data.osLab)+Number($scope.data.osMcq)),
       "coreLab": $scope.data.coreLab,
      "coreMcq": $scope.data.coreMcq,
      "coreTotal":(Number($scope.data.coreLab)+Number($scope.data.coreMcq)),
       "awpLab": $scope.data.awpLab,
      "awpMcq": $scope.data.awpMcq,
      "awpTotal":(Number($scope.data.awpLab)+Number($scope.data.awpMcq)),
       "dbtLab": $scope.data.dbtLab,
      "dbtMcq": $scope.data.dbtMcq,
      "dbtTotal":(Number($scope.data.dbtLab)+Number($scope.data.dbtMcq)),
       "advLab": $scope.data.advLab,
      "advMcq": $scope.data.advMcq,
      "advTotal":(Number($scope.data.advLab)+Number($scope.data.advMcq)),
       "seLab": $scope.data.seLab,
      "advMcq": $scope.data.seMcq,
      "seTotal":(Number($scope.data.seLab)+Number($scope.data.advMcq)),
       "netLab": $scope.data.netLab,
      "netMcq": $scope.data.netMcq,
      "netTotal":(Number($scope.data.netLab)+Number($scope.data.netMcq)),
    };

    var url = "http://localhost:3010/admin/studentUpdate";
    var hpromise = $http.post(url, $scope.jsonObject);
     hpromise.then(function (response) {
            if(response.data.affectedRows>0){
                $scope.custom = false;
               // alert("insert data values successfully...!");
            }

            else{
                $scope.custom1 = false;
               // alert("inset data fails.....!");

            }

            

        }).catch(function (err) {
            console.log(err);
        });

        

}
   

    $scope.toggleMarks = function () {
        $scope.custom = $scope.custom === false ? true : false;
    }

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

    $scope.goHome = function () {
        $location.path("/adminHome");
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

    $scope.setEvent = function ($event) {

        $scope.modalMentor.mentorId = angular.element($event.currentTarget).parent().prev().html();

        console.log($scope.modalMentor.mentorId);
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

    $scope.fetchMentor = function (obj) {

        $scope.jsonObj = { "mentorId": $scope.modalMentor.mentorId };

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

    $scope.updateMentor = function () {

        var url = "http://localhost:3010/admin/mentorUpdate";
        var hpromise = $http.post(url, $scope.modalMentor);
        hpromise.then(function (response) {
            console.log(response.data);

            if (response.data.affectedRows > 0) {
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

    // $scope.addModifylistItemClicked = function (event) {
    //     var id = event.target.id;
    //     if (id == '11') {
    //         $location.path("/adminModifyDetails");
    //     } else if(){
    //         $location.path("/adminUploadExcelSheet");

    //     }
    // };

});
