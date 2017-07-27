var app = angular.module("app");


app.controller("adminModifyDetails", function($scope,$cookies,$location,$http) {

$scope.custom = true;
$scope.custom1 = true;

$scope.data = {};

$scope.toggleMarks = function(){
    $scope.custom = $scope.custom === false ? true : false;
};

$scope.toggleData = function(){
    $scope.custom1 = $scope.custom1 === false ? true : false;
};

$scope.toggleData1 = function(){
    $scope.custom1 = $scope.custom1 === false ? true : false;
};

$scope.changePassword= function(){

    $scope.jsonObject = {

        "stuId": $scope.data.id,
        "oldPwd": $scope.data.oldPwd,
        "newPwd" :$scope.data.newPwd,
        "conPwd":$scope.data.conPwd

    };
    
        var url = "http://localhost:3010/admin/changePwd";
        var hpromise = $http.post(url, $scope.jsonObject);

        hpromise.then(function (response){

            console.log(response);

        }).catch(function (err) {
            console.log(err);
        });

};


    $scope.goToForum=function(){
        $location.path("/mentorDetails");
    };

    $scope.goToMentorDetails=function(){
        $location.path("/mentorDetails");
    };

    $scope.listItemClicked =function(event){
        var id = event.target.id;
        console.log(id); 
        $cookies.put('listItemClicked',id);
                $location.path("/adminDisplaySpecificMarks");

    };

    $scope.addModifylistItemClicked =function(event){
        var id = event.target.id;
       if(id == '11'){
        $location.path("/adminModifyDetails");
       }else
       {
        $location.path("/adminUploadExcelSheet");

       }


    };

    $scope.goHome = function(){
        $location.path("/adminHome");
    };

     $scope.performLogOut = function(){
        $cookies.remove("adminId");
        $cookies.remove("type");
        $cookies.remove("adminUserName");
        $location.path("/");
    };


});