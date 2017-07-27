var app = angular.module("app");

app.controller("adminHome", function($scope,$location,$cookies) {

$scope.custom = true;
$scope.custom1 = true;

$scope.myData = [1,4,5,5,10];

$scope.toggleMarks = function(){
    $scope.custom = $scope.custom === false ? true : false;
};

$scope.toggleData = function(){
    $scope.custom1 = $scope.custom1 === false ? true : false;
};

$scope.toggleData1 = function(){
    $scope.custom1 = $scope.custom1 === false ? true : false;
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